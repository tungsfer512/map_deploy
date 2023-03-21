
// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    getVehicleValidationData,
    getVehiclesValidationDataAsync,
    vehicleValidation
} from '../../store/reducers/vehicleSlice';

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../components/Box/BoxContainer';
import { DataTable } from '../../components/DataTable';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ValidVehicle = () => {
    const { t } = useTranslation();
    const validations = useSelector(vehicleValidation);
    console.log(validations);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVehiclesValidationDataAsync());
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();

    // Click render ProblemItem
    const navigate = useNavigate();

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.id")}`, minWidth: 70, flex: 1, sortable: false, },
        { field: 'binId', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.binId")}`, minWidth: 70, flex: 1, sortable: false, },
        { field: 'plate', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.plate")}`, minWidth: 150, flex: 1, sortable: false, },
        { field: 'model', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.model")}`, minWidth: 200, flex: 1, },
        { field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.status")}`, minWidth: 100, flex: 1, sortable: true },
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


                    <DataTable rows={validations?.data} columns={columns} />

                    <PieChart width={1000} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={validations?.graph}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            label
                        >
                            {validations?.graph?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default ValidVehicle
