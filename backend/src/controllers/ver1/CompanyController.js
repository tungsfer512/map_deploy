const { ADM_Company, ADM_Bin } = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewCompany = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newCompanyData = req.body;
        newCompanyData.image = req?.files?.bin?.[0]?.filename || 'default_company.png';
        console.log(newCompanyData);
        let newCompany = new ADM_Company(newCompanyData);
        let resData = newCompany.dataValues;
        await newCompany.save();
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
const deleteCompanyById = async (req, res) => {
    try {
        let company = await ADM_Company.findOne({
            where: {
                id: req.params.companyId
            },
            raw: true
        });
        if (!company) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Company not found.'
            });
        }
        await ADM_Company.destroy({
            where: {
                id: req.params.companyId
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
const updateCompanyById = async (req, res) => {
    try {
        let company = await ADM_Company.findOne({
            where: {
                id: req.params.companyId
            },
            raw: true
        });
        if (!company) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Company not found.'
            });
        }
        await uploadFile(req, res);
        let newCompanyData = req.body;
        newCompanyData.image = req?.files?.bin?.[0]?.filename || 'default_company.png';
        console.log(newCompanyData);
        await ADM_Company.update(newCompanyData,
            {
                where: {
                    id: req.params.companyId
                },
                raw: true
            }
        );
        let resData = await ADM_Company.findOne({
            where: {
                id: req.params.companyId
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
const getAllCompany = async (req, res) => {
    try {
        let companies = await ADM_Company.findAll({
            raw: true
        });
        if (!companies) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Company not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: companies
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getCompanyById = async (req, res) => {
    try {
        let company = await ADM_Company.findOne({
            where: {
                id: req.params.companyId
            },
            raw: true
        });
        if (!company) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Company not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: company
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewCompany,
    deleteCompanyById,
    updateCompanyById,
    getAllCompany,
    getCompanyById
};
