
// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    getVehicleValidationData, 
    getVehiclesValidationDataAsync
} from '../../store/reducers/vehicleSlice';

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../components/Box/BoxContainer';
import { DataTable } from '../../components/DataTable';
import { useTranslation } from 'react-i18next';


const ValidVehicle = async () => {
    const { t } = useTranslation();
    const validations = await getVehicleValidationData()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVehiclesValidationDataAsync());
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();

    // Click render ProblemItem
    const navigate = useNavigate();

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.id")}`, minWidth: 70, sortable: false, },
        { field: 'code', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.code")}`, minWidth: 70, sortable: false, },
        { field: 'plate', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.plate")}`, minWidth: 150, flex: 1, sortable: false, },
        { field: 'model', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.model")}`, minWidth: 200 },
        { field: 'engineType', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.engineType")}`, minWidth: 150, flex: 1, sortable: false },
        {
            field: 'odometer', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.odometer")}`, minWidth: 100, sortable: false,
            renderCell: (params) => (
                `${params.value} Km`
            ),
        },
        {
            field: 'tonnage', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.tonnage")}`, minWidth: 150, flex: 1, sortable: false,
            renderCell: (params) => (
                `${params.value} Kg`
            ),
        },
        { field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.status")}`, minWidth: 100, sortable: true },
    ];

    return (
        <Fragment>
            <BoxContainer>
                <BoxTitle>
                    <BoxStack>
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                            {t("vehicles.pageName")}
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    {t("vehicles.home")}
                                </Link>
                                <Typography color="text.primary">
                                    {t("vehicles.pageName")}
                                </Typography>
                            </Breadcrumbs>
                        </Typography>
                    </BoxStack>


                    <DataTable rows={validations} columns={columns} />
                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default ValidVehicle
