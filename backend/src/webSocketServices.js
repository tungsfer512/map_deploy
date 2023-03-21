const url = require('url');
const axios = require('axios');
const {
    updatePosition,
    addEvent_Bin_state
} = require('./controllers/ver1/wss');
const { ADM_Bin, ADM_Vehicle } = require('./models/ver1/models');
// Create globals so leaflet can load
global.window = {
    screen: {
        devicePixelRatio: 1
    }
};
global.document = {
    documentElement: {
        style: {}
    },
    getElementsByTagName: function () { return []; },
    createElement: function () { return {}; }
};
global.navigator = {
    userAgent: 'nodejs',
    platform: 'nodejs'
};
global.L = require('leaflet');
// const L = require('leaflet');
require('leaflet-routing-machine')

const webSocketServices = (wss) => {
    let vehicles = {};
    let gpss = {};
    let admins = {};
    let routing = {};
    wss.on('connection', async function connection(ws, req) {
        console.log('A new client connected');
        try {
            const parameters = url.parse(req.url, true);
            let id = parameters.query.id;
            console.log("check id: ", id);
            if (id[0] == 'v') {
                id = id.substr(id.length - 1);
                vehicles[id] = ws;
            }
            if (id[0] == 'g') {
                id = id.substr(id.length - 1);
                gpss[id] = ws;
            }
            if (id[0] == 'a') {
                id = id.substr(id.length - 1);
                admins[id] = ws;
            }
            if (id[0] == 'r') {
                id = id.substr(id.length - 1);
                routing[id] = ws;
            }
        } catch (err) {
            console.log(err);
        }
        try {
            // let vehicles = await ADM_Vehicle.findAll({
            //     raw: true
            // })
            let vehicles = await ADM_Vehicle.findAll({
                where: {
                    id: 1
                },
                raw: true
            })
            // let vehicles = []
            setInterval(async () => {
                for (let vehicle of vehicles) {
                    let vehicleData = await axios.get(`${process.env.STATUS_API}/tracking/${vehicle.id}`);
                    // console.log(vehicleData.data);
                    if (vehicleData.data.message != "success") {
                        console.log(`request vehicle ${vehicle.id} failed 404`);
                        continue;
                    }
                    let code = vehicle.code
                    // console.log('check vehicle code: ' + code);
                    const update = [
                        code,
                        vehicleData.data.data['latitude'],
                        vehicleData.data.data['longitude'],
                        vehicleData.data.data.url
                    ];
                    for (const [key, value] of Object.entries(admins)) {
                        // console.log('check sending vehicle info to admin site: ', update);
                        value.send(JSON.stringify(update));
                    }
                    updatePosition({
                        latitude: vehicleData.data.data['latitude'],
                        longitude: vehicleData.data.data['longitude'],
                        code: code,
                        camera: vehicleData.data.data.url
                    })
                }
            }, 2000)
        } catch (err) {
            console.log(err);
        }
        // event bin status
        try {
            // let bins = await ADM_Bin.findAll({
            //     raw: true
            // })
            let bins = await ADM_Bin.findAll({
                where: {
                    id: [1, 2]
                },
                raw: true
            })
            // let bins = []
            setInterval(async () => {
                for (let bin of bins) {
                    let binData = await axios.get(`${process.env.STATUS_API}/cell/${bin.id}`);
                    // console.log(binData.data);
                    if (binData.data.message != "success") {
                        console.log(`request bin ${bin.id} failed 404`);
                        continue;
                    }
                    let code = bin.code
                    // console.log('check bin code: ' + code);
                    let update = [];
                    if (binData.data.data.weight >= bin.maxWeight - 15) {
                        update = ['alert', {
                            code: code,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'full'
                        }, 'bin full', 'bin'];
                        addEvent_Bin_state({
                            code: code,
                            weight: binData.data.data['weight'],
                            status: update.status,
                        })
                    } else if (bin.weight <= 5) {
                        update = ['no-alert', {
                            code: code,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'empty',
                        }, 'bin empty', 'bin'];
                        addEvent_Bin_state({
                            code: code,
                            weight: binData.data.data['weight'],
                            status: update.status,
                        })
                    } else {
                        update = ['no-alert', {
                            code: code,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'half',
                        }, 'bin half', 'bin'];
                    }
                    for (const [key, value] of Object.entries(admins)) {
                        // console.log('check sending bin info to admin: ', update);
                        value.send(JSON.stringify(update));
                    }
                }
            }, 2000)
        } catch (err) {
            console.log(err);
        }
        ws.on('close', function () {
            ws.close();
        });
    });
};

module.exports = webSocketServices;