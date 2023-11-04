const url = require('url');
const axios = require('axios');
const {
    updatePosition,
    addEvent_Bin_state,
    update_bin
} = require('./controllers/ver1/wss');
const { ADM_Bin, ADM_Vehicle, ADM_Bin_Company, ADM_Company } = require('./models/ver1/models');
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
            setInterval(async () => {
                let vehicles = await ADM_Vehicle.findAll({
                    raw: true
                })
                // let vehicles = await ADM_Vehicle.findAll({
                //     where: {
                //         id: [1, ]
                //     },
                //     raw: true
                // })
                console.log("________________________");
                console.log(vehicles);
                console.log("________________________");
                // let vehicles = []
                for (let vehicle of vehicles) {
                    // let vehicleData = await axios.get(`${process.env.STATUS_API}/tracking?limit=1`);
                    let vehicleData = await axios.get(`${process.env.STATUS_FAKE_API}/vehicle`);
                    let vehicleImageData = await axios.get(`${process.env.STATUS_API}/camera_gps?limit=10`);
                    let image_id = 2;
                    console.log("+++++++++++++++====================");
                    console.log(vehicleData.data);
                    console.log("+++++++++++++++====================");
                    if (vehicleData.data.message != "success") {
                        console.log(`request vehicle ${vehicle.id} failed 404`);
                        for (const [key, value] of Object.entries(admins)) {
                            value.send(JSON.stringify(['alert_api', 'Lỗi khi gọi API lấy thông tin xe hiện tại']));
                        }
                        continue;
                    }
                    let id = vehicle.id
                    // console.log('check vehicle id: ' + id);
                    const update = [
                        id,
                        // 21.235600, 105.808782,
                        vehicleData.data.data[0].location.coordinates[1],
                        vehicleData.data.data[0].location.coordinates[0],
                        vehicleImageData.data.data[image_id]?.image_url
                        // "http://203.162.10.118:8888/media/camera/a4ab715a-63a0-4d26-9c73-d23b2b4c04d5.jpg"
                    ];
                    for (const [key, value] of Object.entries(admins)) {
                        // console.log('check sending vehicle info to admin site: ', update);
                        value.send(JSON.stringify(update));
                    }
                    updatePosition({
                        // latitude: 21.235600,
                        // longitude: 105.808782,
                        latitude: vehicleData.data.data[0].location.coordinates[1],
                        longitude: vehicleData.data.data[0].location.coordinates[0],
                        id: id,
                        camera: vehicleImageData.data.data[image_id]?.image_url
                        // camera: "http://203.162.10.118:8888/media/camera/a4ab715a-63a0-4d26-9c73-d23b2b4c04d5.jpg"
                    })
                }
            }, 1000 * 10)
        } catch (err) {
            console.log(err);
        }
        // event bin status
        try {
            // let bins = []
            setInterval(async () => {
                let bins = await ADM_Bin.findAll({
                    raw: true
                })
                // let bins = await ADM_Bin.findAll({
                //     where: {
                //         id: [1, ]
                //     },
                //     raw: true
                // })
                console.log("________________________");
                console.log(bins);
                console.log("________________________");
                for (let bin of bins) {
                    // let binData = await axios.get(`${process.env.STATUS_API}/cell/${bin.id}`);
                    let binData = await axios.get(`${process.env.STATUS_FAKE_API}/bins/${bin.id}`);
                    // let binData = await axios.get(`${process.env.STATUS_API}/cell/5`);
                    console.log("+====================");
                    console.log(binData.data);
                    console.log("-------------------------------binWeight", bin.id, bin.weight)
                    console.log("+====================");
                    if (binData.data.message != "success") {
                        console.log(`request bin ${bin.id} failed 404`);
                        for (const [key, value] of Object.entries(admins)) {
                            value.send(JSON.stringify(['alert_api', 'Lỗi khi gọi API lấy thông tin thùng rác']));
                        }
                        continue;
                    }
                    let id = bin.id
                    // console.log('check bin id: ' + id);
                    let update = [];
                    if (binData.data.data.weight >= bin.maxWeight - 15000) {
                        update = ['no-alert', {
                            id: id,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            updatedAt: bin.updatedAt,
                            status: 'full'
                        }, 'bin full', 'bin'];
                        update_bin({
                            id: id,
                            weight: binData.data.data['weight'],
                            status: "full",
                        })
                    } else if (binData.data.data.weight <= 5) {
                        update = ['no-alert', {
                            id: id,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'empty',
                        }, 'bin empty', 'bin'];
                        console.log("-------------------------------binWeight", bin.weight)
                        console.log("-------------------------------binDataWeight", binData.data.data.weight)
                        if (bin.weight != 0) {
                            let binCompany = await ADM_Bin_Company.findAll({
                                where: {
                                    binId: id
                                },
                                raw: true
                            });
                            let companyIds = [];
                            for (let j = 0; j < binCompany.length; j++) {
                                companyIds.push(binCompany[j].companyId);
                            }
                            let company = await ADM_Company.findAll({
                                where: {
                                    id: companyIds
                                },
                                raw: true
                            });
                            update = ['alert_reset', {
                                id: id,
                                latitude: bin.latitude,
                                longitude: bin.longitude,
                                weight: binData.data.data.weight,
                                // updatedAt: bin.updatedAt,
                                status: 'empty',
                            }, 'bin empty', 'bin', `Điểm thu gom rác của ${company[0].name} đã được thu gom`];
                            addEvent_Bin_state({
                                id: id,
                                weight: binData.data.data['weight'],
                                status: "empty",
                            })
                        }
                    } else {
                        update = ['no-alert', {
                            id: id,
                            latitude: bin.latitude,
                            longitude: bin.longitude,
                            weight: binData.data.data.weight,
                            // updatedAt: bin.updatedAt,
                            status: 'half',
                        }, 'bin half', 'bin'];
                        update_bin({
                            id: id,
                            weight: binData.data.data['weight'],
                            status: "half",
                        })
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