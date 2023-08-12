import { Box, Breadcrumbs, Button, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, Fragment } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import vehicle_img from '../Map/green-vehicle.png';

import ListIcon from '@mui/icons-material/List';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HeightIcon from '@mui/icons-material/Height';
import HistoryIcon from '@mui/icons-material/History';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SignalCellular0BarIcon from '@mui/icons-material/SignalCellular0Bar';
import SpeedIcon from '@mui/icons-material/Speed';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import WidthFullIcon from '@mui/icons-material/WidthFull';
import StraightenIcon from '@mui/icons-material/Straighten';
import { DataGrid } from '@mui/x-data-grid';
import { assetUrl } from '../../ultils/axiosApi';
import { useState } from 'react';
import { getVehicleDataById, getVehicleStateLog } from '../../store/reducers/vehicleSlice';
import VehicleStateLog from './VehicleStateLog';
import { useTranslation } from 'react-i18next';
import { isAdmin } from "../Auth/Role"

const VehicleItem = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const vehicleId = parseInt(params.vehicleId);


    const [vehicle, setVehicle] = useState(
        {
            engineHours: 0,
            engineId: 0,
            engineType: 0,
            model: "",
            height: 0,
            length: 0,
            width: 0,
            odometer: 0,
            plate: "",
            code: "",
            tonnage: 0,
            image: "",
            status: '',
            camera: '',
        }
    );


    useEffect(() => {
        getVehicleDataById(vehicleId).then((result) => {
            console.log("Result:", result);
            setVehicle(result);
        });
    }, [])

    return (
        <Box>
            {vehicle && (
                <Fragment>
                    <Box sx={{
                        height: 'auto',
                        py: 4,
                        pt: 6,
                        px: 2,
                        maxWidth: 1200,
                        margin: '0 auto',
                    }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                                {t('vehicles.vehicleDetails')}
                                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                    <Link underline="hover" color="inherit" href="">
                                        {t('vehicles.home')}
                                    </Link>
                                    <Link underline="hover" color="inherit" href="/vehicles">
                                        {t('vehicles.pageName')}
                                    </Link>
                                    <Typography color="text.primary">{vehicle.plate}</Typography>
                                </Breadcrumbs>
                            </Typography>

                            {/* Edit problem item */}

                        </Stack>

                        <Paper elevation={0} sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", }, height: "auto", p: 2, mt: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ mb: 2, pt: 2, flexDirection: { xs: "column", sm: "row", md: "row", lg: "row", } }}>
                                <Box sx={{ p: 2, width: '100%', maxWidth: 500 }}>
                                    <img src={`${assetUrl}/vehicle/${vehicle.image}`} alt={vehicle.name} width="100%" />
                                </Box>
                                <Box sx={{ py: 2, minWidth: 300, width: "100%", maxWidth: 500 }}>
                                    <Box sx={{ textAlign: 'start', mb: 1, }}>
                                        {/* status, speed, weight, latitude, longitude */}
                                        <List
                                            aria-labelledby="vehicle-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="vehicle-list-subheader" sx={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    pr: 0,
                                                }}>
                                                    {t("vehicle")} {vehicle.plate}
                                                    {
                                                        isAdmin() &&
                                                        <Button
                                                            variant='contained'
                                                            aria-label="edit"
                                                            color="warning"
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => navigate(`/vehicles/edit/${vehicle.id}`, { state: vehicle })}
                                                        >
                                                            {t('vehicles.edit')}
                                                        </Button>
                                                    }
                                                </ListSubheader>
                                            }
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 'auto',
                                                pb: 0,
                                                width: '100%',

                                                bgcolor: 'background.paper',
                                                "& .MuiListItemIcon-root": {
                                                    minWidth: '32px',
                                                },
                                                "& .MuiListItem-root:nth-of-type(2n+1)": {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                                "& .MuiListItemText-root": {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                },
                                                "& .MuiTypography-body1": {
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#6f6f6f',
                                                },
                                                "& .MuiTypography-body2": {
                                                    fontSize: '12px',
                                                    color: '#6f6f6f',
                                                },
                                                "& .ipcambin": {
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 3,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    wordBreak: 'break-word',
                                                },
                                                "& .MuiListItemText-primary": {
                                                    minWidth: 'max-content',
                                                },
                                                "& .MuiListItemText-multiline": {
                                                    gap: 1,
                                                },
                                            }}
                                        >
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <ListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.table.id')} secondary={vehicle.id} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <ListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.table.code')} secondary={vehicle.code} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <DataThresholdingIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.engineId')} secondary={vehicle.engineId} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <DataThresholdingIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.plate')} secondary={vehicle.plate + ""} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <HistoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.engineType')} secondary={vehicle.engineType + ""} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <HistoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.engineHours')} secondary={vehicle.engineHours + "h"} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <DirectionsCarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.model')} secondary={vehicle.model} />
                                            </ListItem>
                                            {/* <ListItem sx={{ backgroundColor: '#f5f5f5',height: 40 }}>
                                                <ListItemIcon>
                                                    <RoomIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.position')} secondary={vehicle.latitude.toFixed(6) + ', ' + vehicle.longitude.toFixed(6)} />
                                            </ListItem> */}
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <HeightIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.height')} secondary={vehicle.height + ""} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <StraightenIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.length')} secondary={vehicle?.length} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <WidthFullIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.width')} secondary={vehicle.width} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <NetworkCheckIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.odometer')} secondary={vehicle.odometer + ""} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <HeightIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.tonnage')} secondary={vehicle.tonnage + ""} />
                                            </ListItem>

                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t('vehicles.form.status')} secondary={vehicle.status} />
                                            </ListItem>
                                            <ListItem sx={{ height: 'max-content' }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Camera"} className="ipcambin" secondary={vehicle.camera} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            </Stack>

                            {/* <VehicleStateLog vehicleId={vehicleId} /> */}
                        </Paper>
                    </Box>
                </Fragment>
            )}
        </Box>
    )
}

export default VehicleItem