const { ADM_User, ADM_Company, ADM_Task, ADM_Bin, ADM_Vehicle, SUP_Vehicle_Position } = require('../../models/ver1/models');
const bcrypt = require('bcrypt');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewDriver = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newDriverData = req.body;
        newDriverData.image =
            req?.files?.user?.[0]?.filename || 'default_user.png';
        if (
            !newDriverData.phone ||
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName ||
            !newDriverData.gender
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        console.log(newDriverData);
        let isPhoneExist = await isPhoneExisted(newDriverData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        newDriverData.password = encodedPassword;
        newDriverData.role = 'driver';
        newDriverData.status = 'on';
        let newDriver = new ADM_User(newDriverData);
        let resData = newDriver.dataValues;
        await newDriver.save();
        delete resData.password;
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
const deleteDriverById = async (req, res) => {
    try {
        let driver = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await ADM_User.destroy({
            where: {
                id: req.params.userId,
                role: 'driver'
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
const updateDriverById = async (req, res) => {
    try {
        let driver = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await uploadFile(req, res);
        let newDriverData = req.body;
        if (req.files == undefined) {
            newDriverData.image = driver.image;
        } else {
            newDriverData.image = req?.files?.user?.[0]?.filename;
        }
        if (
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName ||
            !newDriverData.gender
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        newDriverData.password = encodedPassword;
        await ADM_User.update(
            newDriverData,
            {
                where: {
                    id: req.params.userId,
                    role: 'driver'
                },
                raw: true
            }
        );
        let resData = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        delete resData.password;
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
const getAllDriver = async (req, res) => {
    try {
        let drivers = await ADM_User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'driver'
            },
            raw: true
        });
        if (!drivers) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: drivers
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDriverById = async (req, res) => {
    try {
        let driver = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: driver
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Create
const addNewCompany_staff = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newCompany_staffData = req.body;
        newCompany_staffData.image =
            req?.files?.user?.[0]?.filename || 'default_user.png';
        if (
            !newCompany_staffData.phone ||
            !newCompany_staffData.password ||
            !newCompany_staffData.email ||
            !newCompany_staffData.firstName ||
            !newCompany_staffData.lastName ||
            !newCompany_staffData.gender ||
            !newCompany_staffData.companyId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isPhoneExist = await isPhoneExisted(newCompany_staffData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newCompany_staffData.password, salt);
        newCompany_staffData.password = encodedPassword;
        newCompany_staffData.status = 'on';
        newCompany_staffData.role = 'company_staff';
        let newCompany_staff = new ADM_User(newCompany_staffData);
        let resData = newCompany_staff.dataValues;
        await newCompany_staff.save();
        resData.company = await ADM_Company.findOne({
            where: {
                id: newCompany_staffData.companyId
            },
            raw: true
        });
        delete resData.password;
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
const deleteCompany_staffById = async (req, res) => {
    try {
        let company_staff = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'company_staff'
            },
            raw: true
        });
        if (!company_staff) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await ADM_User.destroy({
            where: {
                id: req.params.userId,
                role: 'company_staff'
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
const updateCompany_staffById = async (req, res) => {
    try {
        let company_staff = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'company_staff'
            },
            raw: true
        });
        if (!company_staff) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await uploadFile(req, res);
        let newCompany_staffData = req.body;
        if (req.files == undefined) {
            newCompany_staffData.image = company_staff.image;
        } else {
            newCompany_staffData.image = req?.files?.user?.[0]?.filename;
        }
        if (
            !newCompany_staffData.password ||
            !newCompany_staffData.email ||
            !newCompany_staffData.firstName ||
            !newCompany_staffData.lastName ||
            !newCompany_staffData.gender ||
            !newCompany_staffData.companyId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newCompany_staffData.password, salt);
        newCompany_staffData.password = encodedPassword;
        newCompany_staffData.role = 'company_staff';
        await ADM_User.update(newCompany_staffData,
            {
                where: {
                    id: req.params.userId,
                    role: 'company_staff'
                },
                raw: true
            }
        );
        let resData = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'company_staff'
            },
            raw: true
        });
        resData.company = await ADM_Company.findOne({
            where: {
                id: newCompany_staffData.companyId
            },
            raw: true
        });
        delete resData.password;
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
const getAllCompany_staff = async (req, res) => {
    try {
        let company_staffs = await ADM_User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'company_staff'
            },
            raw: true
        });
        if (!company_staffs) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        for (let i = 0; i < company_staffs.length; i++) {
            let company = await ADM_Company.findOne({
                where: {
                    id: company_staffs[i].companyId
                },
                raw: true
            });
            company_staffs[i].company = company;
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: company_staffs
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getCompany_staffById = async (req, res) => {
    try {
        let company_staff = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'company_staff'
            },
            raw: true
        });
        if (!company_staff) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        company_staff.company = await ADM_Company.findOne({
            where: {
                id: company_staff.companyId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: company_staff
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const updateAdminById = async (req, res) => {
    try {
        let admin = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
        });
        if (!admin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Admin not found.'
            });
        }
        await uploadFile(req, res);
        let newAdminData = req.body;
        if (req.files == undefined) {
            newAdminData.image = admin.image;
        } else {
            newAdminData.image = req?.files?.user?.[0]?.filename;
        }
        if (
            !newAdminData.password ||
            !newAdminData.email ||
            !newAdminData.firstName ||
            !newAdminData.lastName ||
            !newAdminData.gender
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newAdminData.password, salt);
        newAdminData.password = encodedPassword;
        await ADM_User.update(newAdminData,
            {
                where: {
                    id: req.params.userId,
                    role: 'admin'
                },
                raw: true
            }
        );
        let resData = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
        });
        delete resData.password;
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
const getAdminById = async (req, res) => {
    try {
        let admin = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
        });
        if (!admin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: admin
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Validate
const isPhoneExisted = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await ADM_User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    phone: phone
                },
                raw: true
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    addNewDriver,
    deleteDriverById,
    updateDriverById,
    getAllDriver,
    getDriverById,
    addNewCompany_staff,
    deleteCompany_staffById,
    updateCompany_staffById,
    getAllCompany_staff,
    getCompany_staffById,
    updateAdminById,
    getAdminById
};
