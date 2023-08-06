const express = require('express');

const VehicleController = require('../../controllers/ver1/VehicleController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let vehicleRouter = express.Router();

vehicleRouter.post(
    '/add',
    MiddlewareController.verify_Token_Company_staff_Admin,
    VehicleController.addNewVehicle
);
vehicleRouter.put(
    '/edit/:vehicleId',
    MiddlewareController.verify_Token,
    VehicleController.updateVehicleById
);
vehicleRouter.delete(
    '/delete/:vehicleId',
    MiddlewareController.verify_Token_Company_staff_Admin,
    VehicleController.deleteVehicleById
);
vehicleRouter.post(
    '/check',
    MiddlewareController.verify_Token, 
    VehicleController.checkVehicle
)
vehicleRouter.get(
    '/validation',
    MiddlewareController.verify_Token, 
    VehicleController.getVehicleValidation
)
vehicleRouter.get(
    '/routes/:vehicleId',
    MiddlewareController.verify_Token,
    VehicleController.getRoutesByVehicleId
);
vehicleRouter.get(
    '/:vehicleId',
    MiddlewareController.verify_Token,
    VehicleController.getVehicleById
);
vehicleRouter.get(
    '/',
    MiddlewareController.verify_Token_Company_staff_Admin,
    VehicleController.getAllVehicle
);

module.exports = vehicleRouter;
