const { ADM_Bin, ADM_Company, ADM_Bin_Company } = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');
const axios = require('axios');

// Create
const addNewBin = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newBinData = req.body;
        newBinData.image = req?.files?.bin?.[0]?.filename || 'default_bin.png';
        console.log(newBinData);
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.maxWeight ||
            !newBinData.camera1 ||
            !newBinData.camera2 ||
            !newBinData.camera3
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        newBinData.status = 'empty';
        let newBin = new ADM_Bin(newBinData);
        let resData = newBin.dataValues;
        await newBin.save();

        let companyIds = newBinData.companyId.split(',');
        for (let i = 0; i < companyIds.length; i++) {
            let newBinCompany = new ADM_Bin_Company({
                binId: Number(resData.id),
                companyId: Number(companyIds[i])
            });
            await newBinCompany.save();
        }
        resData.company = await ADM_Company.findAll({
            where: {
                id: companyIds
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
// Delete
const deleteBinById = async (req, res) => {
    try {
        let bin = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        await ADM_Bin.destroy({
            where: {
                id: req.params.binId
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
const updateBinById = async (req, res) => {
    try {
        let bin = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        await uploadFile(req, res);
        let newBinData = req.body;
        if (req.files == undefined) {
            newBinData.image = bin.image;
        } else {
            newBinData.image = req?.files?.bin?.[0]?.filename;
        }
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.maxWeight ||
            !newBinData.camera1 ||
            !newBinData.camera2 ||
            !newBinData.camera3
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await ADM_Bin.update(newBinData,
            {
                where: {
                    id: req.params.binId
                },
                raw: true
            }
        );

        let companyIds = newBinData.companyId.split(',');
        for (let i = 0; i < companyIds.length; i++) {
            let binCompany = await ADM_Bin_Company.findOne({
                where: {
                    binId: req.params.binId,
                    companyId: Number(companyIds[i])
                },
                raw: true
            });
            if (!binCompany) {
                let newBinCompany = new ADM_Bin_Company({
                    binId: Number(req.params.binId),
                    companyId: Number(companyIds[i])
                });
                await newBinCompany.save();
            }
        }
        let resData = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        resData.company = await ADM_Company.findAll({
            where: {
                id: companyIds
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
const getAllBin = async (req, res) => {
    try {
        let bins = await ADM_Bin.findAll({
            raw: true
        });
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
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
        }
        console.log("____________________", req?.query);
        if (req.query.companyId) {
            console.log("____________________", req.query.companyId);
            bins = bins.filter((bin) => {
                let companyIds = [];
                for (let i = 0; i < bin.company.length; i++) {
                    companyIds.push(bin.company[i].id);
                }
                return companyIds.includes(Number(req.query.companyId));
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bins
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getBinById = async (req, res) => {
    try {
        let bin = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        let binCompany = await ADM_Bin_Company.findAll({
            where: {
                binId: bin.id
            },
            raw: true
        });
        let companyIds = [];
        for (let j = 0; j < binCompany.length; j++) {
            companyIds.push(binCompany[j].companyId);
        }
        bin.company = await ADM_Company.findAll({
            where: {
                id: companyIds
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bin
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getResetBinById = async (req, res) => {
    try {
        await ADM_Bin.update(
            {
                weight: 0,
                status: "empty"
            },
            {
                where: {
                    id: req.params.binId
                },
                raw: true
            }
        );
        let binReset = await axios.put("http://localhost:9998/bins/" + req.params.binId, {weight: 0});
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK'
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewBin,
    deleteBinById,
    updateBinById,
    getAllBin,
    getBinById,
    getResetBinById
};
