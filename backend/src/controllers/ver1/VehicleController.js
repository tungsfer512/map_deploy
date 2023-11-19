const {
    ADM_Vehicle,
    SUP_Vehicle_Position,
    ADM_Task,
    ADM_User,
    VALID_Vehicle,
    ADM_Bin,
    ADM_Bin_Company,
    ADM_Company
} = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

// Create
const addNewVehicle = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newVehicleData = req.body;
        newVehicleData.image =
            req?.files?.vehicle?.[0]?.filename || 'default_vehicle.png';
        console.log(newVehicleData);
        if (
            !newVehicleData.engineHours ||
            !newVehicleData.plate ||
            !newVehicleData.tonnage
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        newVehicleData.status = 'on';

        let newVehicle = new ADM_Vehicle(newVehicleData);
        let resData = newVehicle.dataValues;
        await newVehicle.save();
        if (!newVehicleData?.latitude) {
            newVehicleData.latitude = 21.028511;
        }
        if (!newVehicleData?.longitude) {
            newVehicleData.longitude = 105.804817;
        }
        let newVehiclePosition = new SUP_Vehicle_Position({
            latitude: newVehicleData?.latitude,
            longitude: newVehicleData?.longitude,
            vehicleId: resData.id
        });
        await newVehiclePosition.save();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteVehicleById = async (req, res) => {
    try {
        let vehicle = await ADM_Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        await ADM_Vehicle.destroy({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK'
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateVehicleById = async (req, res) => {
    try {
        let vehicle = await ADM_Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        await uploadFile(req, res);
        let newVehicleData = req.body;
        if (req.files == undefined) {
            newVehicleData.image = vehicle.image;
        } else {
            newVehicleData.image = req?.files?.vehicle?.[0]?.filename;
        }
        if (
            !newVehicleData.engineHours ||
            !newVehicleData.plate ||
            !newVehicleData.tonnage
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await ADM_Vehicle.update(newVehicleData,
            {
                where: {
                    id: req.params.vehicleId
                },
                raw: true
            }
        );
        let resData = await ADM_Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllVehicle = async (req, res) => {
    try {
        console.log("==========================1")
        let vehicles = await ADM_Vehicle.findAll({
            raw: true
        });
        console.log("==========================2")
        if (!vehicles) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        console.log("==========================3")
        for (let i = 0; i < vehicles.length; i++) {
            console.log("==========================4")
            let vehiclePosition = await SUP_Vehicle_Position.findOne({
                where: {
                    vehicleId: vehicles[i].id
                },
                raw: true
            });
            console.log("==========================5")
            vehicles[i].latitude = vehiclePosition.latitude;
            vehicles[i].longitude = vehiclePosition.longitude;
            console.log("==========================6")
            let task = await ADM_Task.findOne({
                where: {
                    vehicleId: vehicles[i].id,
                    status: 'on'
                },
                raw: true
            });
            console.log("==========================7")
            vehicles[i].driver = await ADM_User.findOne({
                where: {
                    id: task.driverId
                },
                raw: true
            });
            console.log("==========================8")
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicles
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getVehicleById = async (req, res) => {
    try {
        let vehicle = await ADM_Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicle
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

const checkVehicle = async (req, res) => {
    try {
        let vehicleData = req.body;
        if (
            !vehicleData.plate ||
            !vehicleData.latitude ||
            !vehicleData.longitude ||
            !vehicleData.binId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let vehicle = await ADM_Vehicle.findOne({
            where: {
                plate: vehicleData.plate,
            },
            raw: true
        });
        let validVehicle = new VALID_Vehicle({
            latitude: vehicleData.latitude,
            longitude: vehicleData.longitude,
            plate: vehicleData.plate,
            binId: vehicleData.binId,
            status: "valid",
        })
        if (!vehicle) {
            validVehicle.status = "invalid"
        }
        await validVehicle.save()
        let resData = validVehicle.dataValues;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'Validation for vehicle',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

const getVehicleValidation = async (req, res) => {
    try {
        let vehicles = await VALID_Vehicle.findAll({
            raw: true
        })
        let valids = vehicles.filter(vehicle => vehicle.status === 'valid')
        let invalids = vehicles.filter(vehicle => vehicle.status === 'invalid')
        let resData = {
            'graph': [
                { 'name': 'Valid', 'value': valids.length },
                { 'name': 'Invalid', 'value': invalids.length }
            ],
            'data': vehicles
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

let getRoutesByVehicleId = async (req, res) => {
    try {
        // let vehicle = await ADM_Vehicle.findOne({
        //     where: {
        //         id: req.params.vehicleId
        //     },
        //     raw: true
        // });
        // if (!vehicle) {
        //     return res.status(404).json({
        //         resCode: 404,
        //         resMessage: 'Vehicle not found.'
        //     });
        // }
        // let latLng = await SUP_Vehicle_Position.findOne({
        //     where: {
        //         vehicleId: vehicle.id
        //     },
        //     raw: true
        // })
        // let bins = await ADM_Bin.findAll({ raw: true })
        // let demand = []
        // for (let bin of bins) {
        //     demand.push({
        //         "id": bin.id,
        //         "quantity": bin.weight,
        //         "latitude": bin.latitude,
        //         "longitude": bin.longitude
        //     })
        // }
        // console.log(demand);
        // let sendRes = await axios.post(
        //     process.env.ROUTES_API,
        //     {
        //         "stack_id": 1,
        //         "origin": {
        //             "id": vehicle.id,
        //             "latitude": latLng.latitude,
        //             "longitude": latLng.longitude
        //         },
        //         "unit": "kg",
        //         "vehicle_capacity": vehicle.tonnage,
        //         "demand": demand
        //     }
        // )
        // console.log(sendRes.data, "check dataa");
        // let routesResponse = sendRes.data;
        // let routesResponse = {
        //     "demand": [
        //         {
        //             "id": 1,
        //             "latitude": 21.17943,
        //             "longitude": 105.77948,
        //             "quantity": 18
        //         },
        //         {
        //             "id": 2,
        //             "latitude": 21.18181,
        //             "longitude": 105.77941,
        //             "quantity": 19
        //         },
        //         {
        //             "id": 3,
        //             "latitude": 21.18106,
        //             "longitude": 105.77539,
        //             "quantity": 28
        //         },
        //         {
        //             "id": 4,
        //             "latitude": 21.18188,
        //             "longitude": 105.77595,
        //             "quantity": 13
        //         },
        //         {
        //             "id": 5,
        //             "latitude": 21.1834,
        //             "longitude": 105.77598,
        //             "quantity": 13
        //         },
        //         {
        //             "id": 6,
        //             "latitude": 21.18185,
        //             "longitude": 105.77798,
        //             "quantity": 11
        //         },
        //         {
        //             "id": 7,
        //             "latitude": 21.18014,
        //             "longitude": 105.77728,
        //             "quantity": 4
        //         },
        //         {
        //             "id": 8,
        //             "latitude": 21.18552,
        //             "longitude": 105.77946,
        //             "quantity": 6
        //         },
        //         {
        //             "id": 9,
        //             "latitude": 21.18558,
        //             "longitude": 105.77784,
        //             "quantity": 2
        //         },
        //         {
        //             "id": 10,
        //             "latitude": 21.18559,
        //             "longitude": 105.77659,
        //             "quantity": 34
        //         },
        //         {
        //             "id": 11,
        //             "latitude": 21.1858,
        //             "longitude": 105.7766,
        //             "quantity": 40
        //         },
        //         {
        //             "id": 12,
        //             "latitude": 21.18576,
        //             "longitude": 105.77798,
        //             "quantity": 17
        //         },
        //         {
        //             "id": 13,
        //             "latitude": 21.18561,
        //             "longitude": 105.77569,
        //             "quantity": 10
        //         },
        //         {
        //             "id": 14,
        //             "latitude": 21.18571,
        //             "longitude": 105.77406,
        //             "quantity": 7
        //         },
        //         {
        //             "id": 15,
        //             "latitude": 21.18585,
        //             "longitude": 105.77336,
        //             "quantity": 8
        //         },
        //         {
        //             "id": 16,
        //             "latitude": 21.18614,
        //             "longitude": 105.77263,
        //             "quantity": 10
        //         },
        //         {
        //             "id": 17,
        //             "latitude": 21.1864,
        //             "longitude": 105.77221,
        //             "quantity": 8
        //         },
        //         {
        //             "id": 18,
        //             "latitude": 21.18702,
        //             "longitude": 105.77143,
        //             "quantity": 9
        //         },
        //         {
        //             "id": 19,
        //             "latitude": 21.18781,
        //             "longitude": 105.77047,
        //             "quantity": 8
        //         },
        //         {
        //             "id": 20,
        //             "latitude": 21.18829,
        //             "longitude": 105.76989,
        //             "quantity": 11
        //         }
        //     ],
        //     "origin": {
        //         "id": 1,
        //         "latitude": 21.1822,
        //         "longitude": 105.8137
        //     },
        //     "routes": [
        //         {
        //             "demand_id": 1,
        //             "depot_id": 1,
        //             "stop_number": 2,
        //             "vehicle_id": 1
        //         },
        //         {
        //             "demand_id": 2,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 1
        //         },
        //         {
        //             "demand_id": 3,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 2
        //         },
        //         {
        //             "demand_id": 4,
        //             "depot_id": 1,
        //             "stop_number": 2,
        //             "vehicle_id": 3
        //         },
        //         {
        //             "demand_id": 5,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 3
        //         },
        //         {
        //             "demand_id": 6,
        //             "depot_id": 1,
        //             "stop_number": 3,
        //             "vehicle_id": 6
        //         },
        //         {
        //             "demand_id": 7,
        //             "depot_id": 1,
        //             "stop_number": 5,
        //             "vehicle_id": 7
        //         },
        //         {
        //             "demand_id": 8,
        //             "depot_id": 1,
        //             "stop_number": 2,
        //             "vehicle_id": 6
        //         },
        //         {
        //             "demand_id": 9,
        //             "depot_id": 1,
        //             "stop_number": 5,
        //             "vehicle_id": 8
        //         },
        //         {
        //             "demand_id": 10,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 4
        //         },
        //         {
        //             "demand_id": 11,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 5
        //         },
        //         {
        //             "demand_id": 12,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 6
        //         },
        //         {
        //             "demand_id": 13,
        //             "depot_id": 1,
        //             "stop_number": 4,
        //             "vehicle_id": 7
        //         },
        //         {
        //             "demand_id": 14,
        //             "depot_id": 1,
        //             "stop_number": 3,
        //             "vehicle_id": 7
        //         },
        //         {
        //             "demand_id": 15,
        //             "depot_id": 1,
        //             "stop_number": 2,
        //             "vehicle_id": 7
        //         },
        //         {
        //             "demand_id": 16,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 7
        //         },
        //         {
        //             "demand_id": 17,
        //             "depot_id": 1,
        //             "stop_number": 4,
        //             "vehicle_id": 8
        //         },
        //         {
        //             "demand_id": 18,
        //             "depot_id": 1,
        //             "stop_number": 3,
        //             "vehicle_id": 8
        //         },
        //         {
        //             "demand_id": 19,
        //             "depot_id": 1,
        //             "stop_number": 2,
        //             "vehicle_id": 8
        //         },
        //         {
        //             "demand_id": 20,
        //             "depot_id": 1,
        //             "stop_number": 1,
        //             "vehicle_id": 8
        //         }
        //     ],
        //     "stack_id": 1,
        //     "unit": "kg",
        //     "vehicle_capacity": 40
        // }
        // let demandData = routesResponse.demand;
        // demandData.sort((a, b) => {
        //     if (a.id < b.id)
        //         return -1
        //     if (a.id > b.id)
        //         return 1
        // })
        // let resData = routesResponse.routes;

        // for (let xxx of resData) {
        //     let teDemand = demandData.find(a => a.id == xxx.demand_id)
        //     xxx.demand = teDemand
        // }

        // resData.sort((a, b) => {
        //     if (a.stop_number > b.stop_number)
        //         return 1
        //     if (a.stop_number < b.stop_number)
        //         return -1
        //     if (a.demand_id > b.demand_id)
        //         return 1
        //     if (a.demand_id < b.demand_id)
        //         return -1
        // })
        // let resData = [
        //     {
        //         "demand_id": 1,
        //         "depot_id": 1,
        //         "stop_number": 1,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 1,
        //             "latitude": 21.23385,
        //             "longitude": 105.811164,
        //             "quantity": 1
        //         },
        //         "company": "Công ty TNHH Kyoei Việt Nam (Nhà máy 1)"
        //     },
        //     {
        //         "demand_id": 8,
        //         "depot_id": 8,
        //         "stop_number": 8,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 8,
        //             "latitude": 21.231271,
        //             "longitude": 105.812022,
        //             "quantity": 8
        //         },
        //         "company": "Công Ty TNHH Asahi Denso Việt Nam"
        //     },
        //     {
        //         "demand_id": 10,
        //         "depot_id": 10,
        //         "stop_number": 10,
        //         "vehicle_id": 10,
        //         "demand": {
        //             "id": 10,
        //             "latitude": 21.232646,
        //             "longitude": 105.808275,
        //             "quantity": 10
        //         },
        //         "company": "Công Ty TNHH Honest Việt Nam"
        //     },
        //     {
        //         "demand_id": 2,
        //         "depot_id": 2,
        //         "stop_number": 2,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 2,
        //             "latitude": 21.228515,
        //             "longitude": 105.819616,
        //             "quantity": 2
        //         },
        //         "company": "Công Ty Cổ Phần Thép Đặc Biệt Pro-Vision"
        //     },
        //     {
        //         "demand_id": 6,
        //         "depot_id": 6,
        //         "stop_number": 6,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 6,
        //             "latitude": 21.228801,
        //             "longitude": 105.819658,
        //             "quantity": 6
        //         },
        //         "company": "Công Ty TNHH Hamagasu Việt Nam"
        //     },
        //     {
        //         "demand_id": 3,
        //         "depot_id": 3,
        //         "stop_number": 3,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 3,
        //             "latitude": 21.231008,
        //             "longitude": 105.820339,
        //             "quantity": 3
        //         },
        //         "company": "Công Ty TNHH Kishiro Việt Nam"
        //     },
        //     {
        //         "demand_id": 9,
        //         "depot_id": 9,
        //         "stop_number": 9,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 9,
        //             "latitude": 21.236329,
        //             "longitude": 105.812871,
        //             "quantity": 9
        //         },
        //         "company": "Công Ty TNHH Tenma Việt Nam"
        //     },
        //     {
        //         "demand_id": 4,
        //         "depot_id": 4,
        //         "stop_number": 4,
        //         "vehicle_id": 1,
        //         "demand": {
        //             "id": 4,
        //             "latitude": 21.235927,
        //             "longitude": 105.814744,
        //             "quantity": 4
        //         },
        //         "company": "Công ty Nội Bài"
        //     },
        // ]

        let resData = []
        let vehiclePosition = await SUP_Vehicle_Position.findOne({
            where: {
                vehicleId: req.params.vehicleId
            },
            raw: true
        });

        let bins = await ADM_Bin.findAll({
            raw: true
        });
        let te_arr = []
        
        for (let i = 0; i < bins.length; i++) {
            let binCompany = await ADM_Bin_Company.findAll({
                where: {
                    binId: bins[i].id
                },
                raw: true
            });
            let companyIds = [];
            for (let j = 0; j < binCompany.length; j++) {
                companyIds.push(binCompany[j].companyId);
            }
            bins[i].company = await ADM_Company.findAll({
                where: {
                    id: companyIds
                },
                raw: true
            });
            let distance = (bins[i].latitude - vehiclePosition.latitude) * (bins[i].latitude - vehiclePosition.latitude) + (bins[i].longitude - vehiclePosition.longitude) * (bins[i].longitude - vehiclePosition.longitude);
            let x_te = {
                id: bins[i].id,
                ratio: bins[i].weight / distance,
                weight: bins[i].weight,
                latitude: bins[i].latitude,
                longitude: bins[i].longitude,
                company: bins[i].company[0].name
            }
            te_arr.push(x_te)
        }

        te_arr.sort((a, b) => b.ratio - a.ratio)
        resData.push({
            "demand_id": 0,
            "depot_id": 0,
            "stop_number": 0,
            "vehicle_id": 1,
            "demand": {
                "id": 0,
                "latitude": 20.98036646550657,
                "longitude": 105.7878550887108,
                "quantity": 0
            },
            "company": "Diem xuat phat",
            "ratio": 0
        })
        for (let i = 0; i < te_arr.length; i++) {
            if(te_arr[i].id !== 3 && te_arr[i].id !== 5) {
                resData.push({
                    "demand_id": te_arr[i].id,
                    "depot_id": te_arr[i].id,
                    "stop_number": te_arr[i].id,
                    "vehicle_id": 1,
                    "demand": {
                        "id": te_arr[i].id,
                        "latitude": te_arr[i].latitude,
                        "longitude": te_arr[i].longitude,
                        "quantity": te_arr[i].weight
                    },
                    "company": te_arr[i].company,
                    "ratio": te_arr[i].ratio
                })
            }
        }
        // 1-8-10-2-6-3-4-9

        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK Got Routes',
            data: resData
            // data: [resData[1]]
        });

    } catch (err) {
        console.log("err", err)
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
}

module.exports = {
    addNewVehicle,
    deleteVehicleById,
    updateVehicleById,
    getAllVehicle,
    getVehicleById,
    checkVehicle,
    getVehicleValidation,
    getRoutesByVehicleId
};
