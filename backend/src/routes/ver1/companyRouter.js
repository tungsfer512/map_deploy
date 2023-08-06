const express = require('express');

const CompanyController = require('../../controllers/ver1/CompanyController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let companyRouter = express.Router();

companyRouter.post(
    '/add',
    MiddlewareController.verify_Token_Company_staff_Admin,
    CompanyController.addNewCompany
);
companyRouter.put(
    '/edit/:companyId',
    MiddlewareController.verify_Token_Company_staff_Admin,
    CompanyController.updateCompanyById
);
companyRouter.delete(
    '/delete/:companyId',
    MiddlewareController.verify_Token_Company_staff_Admin,
    CompanyController.deleteCompanyById
);
companyRouter.get(
    '/:companyId',
    MiddlewareController.verify_Token,
    CompanyController.getCompanyById
);
companyRouter.get(
    '/',
    MiddlewareController.verify_Token_Company_staff_Admin,
    CompanyController.getAllCompany
);

module.exports = companyRouter;
