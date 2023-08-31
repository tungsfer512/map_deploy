const url = require('url');
const {
    ADM_Bin,
    ADM_Vehicle,
    LOG_Bin_State,
    SUP_Vehicle_Position,
} = require('../../models/ver1/models');

// add event to log_bin_State
const addEvent_Bin_state = async (data) => {
    try {
        await ADM_Bin.update(
            { status: data.status, weight: data.weight },
            { where: { id: data.id }, raw: true }
        );
        const bin = await ADM_Bin.findOne({
            where: { id: data.id },
            raw: true
        });
        const log = new LOG_Bin_State(
            {
                latitude: data.latitude,
                longitude: data.longitude,
                weight: data.weight,
                status: data.status,
                binId: bin.id
            },
            { raw: true }
        );
        await log.save();
        return log.dataValues
    } catch (err) {
        console.log(err);
    }
};

const update_bin = async (data) => {
    await ADM_Bin.update(
        { status: data.status, weight: data.weight },
        { where: { id: data.id }, raw: true }
    );
}

const updatePosition = async (data) => {
    try {
        let vehicle = await ADM_Vehicle.findOne({
            where: {
                id: data.id
            },
            raw: true
        })
        await ADM_Vehicle.update(
            {
                camera: data.camera
            },
            {
                where: {
                    id: data.id
                },
                raw: true
            })
        const log = await SUP_Vehicle_Position.update(
            {
                latitude: data.latitude,
                longitude: data.longitude
            },
            {
                where: { vehicleId: vehicle.id },
                raw: true
            }
        );
        return log;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    updatePosition,
    addEvent_Bin_state,
    update_bin
};
