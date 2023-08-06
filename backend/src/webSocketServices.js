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
                    id: [1, ]
                },
                raw: true
            })
            console.log("________________________");
            console.log(vehicles);
            console.log("________________________");
            // let vehicles = []
            setInterval(async () => {
                for (let vehicle of vehicles) {
                    let vehicleData = await axios.get(`${process.env.STATUS_API}/tracking/${vehicle.id}`);
                    console.log("+++++++++++++++====================");
                    console.log(vehicleData.data);
                    console.log("+++++++++++++++====================");
                    if (vehicleData.data.message != "success") {
                        console.log(`request vehicle ${vehicle.id} failed 404`);
                        continue;
                    }
                    let id = vehicle.id
                    // console.log('check vehicle id: ' + id);
                    const update = [
                        id,
                        41.848447,
                        // vehicleData.data.data['latitude'],
                        vehicleData.data.data['longitude'],
                        vehicleData.data.data.url
                    ];
                    for (const [key, value] of Object.entries(admins)) {
                        // console.log('check sending vehicle info to admin site: ', update);
                        value.send(JSON.stringify(update));
                    }
                    updatePosition({
                        latitude: 41.848447,
                        // latitude: vehicleData.data.data['latitude'],
                        longitude: vehicleData.data.data['longitude'],
                        id: id,
                        camera: vehicleData.data.data.url
                    })
                }
            }, 1000 * 60)
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
                    id: [1, ]
                },
                raw: true
            })
            console.log("________________________");
            console.log(bins);
            console.log("________________________");
            // let bins = []
            setInterval(async () => {
                for (let bin of bins) {
                    // let binData = await axios.get(`${process.env.STATUS_API}/cell/${bin.id}`);
                    let binData = await axios.get(`${process.env.STATUS_API}/cell/5`);
                    console.log("+====================");
                    console.log(binData.data);
                    console.log("+====================");
                    if (binData.data.message != "success") {
                        console.log(`request bin ${bin.id} failed 404`);
                        continue;
                    }
                    let id = bin.id
                    // console.log('check bin id: ' + id);
                    let update = [];
                    if (binData.data.data.weight >= bin.maxWeight - 15) {
                        update = ['alert', {
                            id: id,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'full'
                        }, 'bin full', 'bin'];
                        addEvent_Bin_state({
                            id: id,
                            weight: binData.data.data['weight'],
                            status: update.status,
                        })
                    } else if (bin.weight <= 5) {
                        update = ['no-alert', {
                            id: id,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'empty',
                        }, 'bin empty', 'bin'];
                        addEvent_Bin_state({
                            id: id,
                            weight: binData.data.data['weight'],
                            status: update.status,
                        })
                    } else {
                        update = ['no-alert', {
                            id: id,
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
            }, 1000 * 60)
        } catch (err) {
            console.log(err);
        }
        ws.on('close', function () {
            ws.close();
        });
    });
};

module.exports = webSocketServices;