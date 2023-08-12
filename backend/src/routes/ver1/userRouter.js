const express = require('express');

const UserController = require('../../controllers/ver1/UserController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let userRouter = express.Router();
// Create
userRouter.post(
    '/drivers/add',
    MiddlewareController.verify_Token_Company_staff_Admin,
    UserController.addNewDriver
);
userRouter.post(
    '/company_staffs/add',
    MiddlewareController.verify_Token_Admin,
    UserController.addNewCompany_staff
);
// Update
userRouter.put(
    '/drivers/edit/:userId',
    MiddlewareController.verify_Token_UserId_Company_staff_Admin,
    UserController.updateDriverById
);
userRouter.put(
    '/company_staff/edit/:userId',
    MiddlewareController.verify_Token_UserId_Admin,
    UserController.updateCompany_staffById
);
// Delete
userRouter.delete(
    '/drivers/delete/:userId',
    MiddlewareController.verify_Token_Company_staff_Admin,
    UserController.deleteDriverById
);
userRouter.delete(
    '/company_staffs/delete/:userId',
    MiddlewareController.verify_Token_Admin,
    UserController.deleteCompany_staffById
);
// Read
userRouter.get(
    '/drivers/:userId',
    MiddlewareController.verify_Token_UserId_Company_staff_Admin,
    UserController.getDriverById
);
userRouter.get(
    '/company_staffs/:userId',
    MiddlewareController.verify_Token_UserId_Admin,
    UserController.getCompany_staffById
);
userRouter.get(
    '/admins/:userId',
    MiddlewareController.verify_Token_UserId_Admin,
    UserController.getAdminById
);
userRouter.get(
    '/drivers',
    MiddlewareController.verify_Token_Company_staff_Admin,
    UserController.getAllDriver
);
userRouter.get(
    '/company_staffs',
    MiddlewareController.verify_Token_Admin,
    UserController.getAllCompany_staff
);

module.exports = userRouter;
