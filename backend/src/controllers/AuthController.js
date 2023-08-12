const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ADM_User, ADM_Task, ADM_Vehicle, ADM_Bin, ADM_Company, SUP_Vehicle_Position } = require('../models/ver1/models');
const uploadFile = require('./uploadFileMiddleware');

const register = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newUserData = req.body;
        console.log(req.files);
        newUserData.image = req?.files?.[0]?.filename || 'default_user.png';
        if (
            !newUserData.phone ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.gender
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isPhoneExist = await isPhoneExisted(newUserData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        newUserData.password = encodedPassword;
        newUserData.status = 'off';
        newUserData.role = 'admin';
        let newUser = new ADM_User(newUserData);
        let resData = newUser.dataValues;
        console.log(resData);
        await newUser.save();
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
const login = async (req, res) => {
    try {
        let reqUserData = req.body;
        if (!reqUserData.phone || !reqUserData.password) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let userData = await ADM_User.findOne({
            where: {
                phone: reqUserData.phone
            },
            raw: true
        });
        if (!userData) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        let validPassword = await bcrypt.compare(
            reqUserData.password,
            userData.password
        );
        if (!validPassword) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Wrong password.'
            });
        }
        delete userData.password;
        const accessToken = jwt.sign(
            {
                id: userData.id,
                role: userData.role
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '365d'
            }
        );
        let resData = {
            ...userData,
            accessToken: accessToken,
        };
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
    register,
    login
};
