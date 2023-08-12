// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../components/Box/BoxContainer';
import { DataTable } from '../../components/DataTable';
import { binsSelector, getBinsDataAsync } from '../../store/reducers/binSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BinAction from './BinAction';
import { useTranslation } from 'react-i18next';
import { getStatus } from './constant';
import { isAdmin, isStaff } from "../Auth/Role"


const Bins = () => {
    const { t } = useTranslation();
    const bins = useSelector(binsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isStaff()) {
            dispatch(getBinsDataAsync());
        } else {
            const user = localStorage.getItem('user')
            dispatch(getBinsDataAsync(JSON.parse(user)?.companyId));
        }
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();

    // Click render ProblemItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        navigate(`/bins/${param.row.id}`, { state: param.row });
    };

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.id")}`, minWidth: 70, sortable: false, },
        { field: 'code', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.code")}`, minWidth: 70, sortable: false, },
        {
            field: 'company', headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.company")}`, minWidth: 300,
            renderCell: (params) => {
                console.log(params.value);
                return <div>
                    {
                        params.value.map((company) => (<div>{company.id + " - " + company.name}</div>))
                    }
                </div>
            }
        },
        // { field: 'address', headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.address")}`, flex: 1, minWidth: 200, sortable: false },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.latitude")}`, minWidth: 100, flex: 1, sortable: true },
        { field: 'longitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.longitude")}`, minWidth: 100, flex: 1, sortable: false },
        {
            field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.status")}`, minWidth: 100, sortable: true,
            renderCell: (params) => {
                const status = getStatus(params.value);

                return (
                    `${t("bins.table." + status)}`
                );
            }
        },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.action")}`, flex: 1, minWidth: 150, sortable: false,
            renderCell: (params) => (
                <BinAction params={params} />
            )
        },
    ];

    return (
        <Fragment>
            <BoxContainer>
                <BoxTitle>
                    <BoxStack>
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                            {t("bins.pageName")}
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    {t("bins.home")}
                                </Link>
                                <Typography color="text.primary">
                                    {t("bins.pageName")}
                                </Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /problems/Add */}
                        {
                            isAdmin(user) &&
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/bins/add')}
                            >
                                {t("bins.add")}
                            </Button>
                        }
                    </BoxStack>
                    <DataTable rows={bins} columns={columns} />
                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Bins