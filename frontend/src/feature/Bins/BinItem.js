import { Box, Breadcrumbs, Button, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, Fragment } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ListIcon from '@mui/icons-material/List';
import RoomIcon from '@mui/icons-material/Room';
import MapIcon from '@mui/icons-material/Map';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WidthFullIcon from '@mui/icons-material/WidthFull';
import StraightenIcon from '@mui/icons-material/Straighten';
import AppsIcon from '@mui/icons-material/Apps';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { DataGrid } from '@mui/x-data-grid';
import { assetUrl } from '../../ultils/axiosApi';
import { useState } from 'react';
import { getBinDataById } from '../../store/reducers/binSlice';
import BinStateLog from './BinStateLog';
import { useTranslation } from 'react-i18next';
import { getStatus } from './constant';
import { isAdmin } from "../Auth/Role"

const BinItem = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const binId = parseInt(params.binId);

    const [bin, setBin] = useState(
        {
            id: 0,
            code: "",
            // areaId: 0,
            latitude: 0,
            longitude: 0,
            // address: "",
            height: 0,
            length: 0,
            width: 0,
            maxWeight: 0,
            color: '',
            material: '',
            brand: '',
            description: '',
            status: '',
            image: "",
            camera1: "",
            camera2: "",
            camera3: "",
            company: []
        }
    );

    useEffect(() => {
        getBinDataById(binId).then((result) => {
            console.log("Result:", result);
            setBin(result);
        });
    }, [])


    return (
        <Box>
            {bin && (
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
                                {t("bins.binDetails")}
                                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                    <Link underline="hover" color="inherit" href="">
                                        {t("bins.home")}
                                    </Link>
                                    <Link underline="hover" color="inherit" href="/bins">
                                        {t("bins.pageName")}
                                    </Link>
                                    <Typography color="text.primary">ID: {bin.id}</Typography>
                                </Breadcrumbs>
                            </Typography>

                            {/* Edit problem item */}

                        </Stack>

                        <Paper elevation={0} sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", }, height: "auto", p: 2, mt: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ mb: 2, pt: 2, flexDirection: { xs: "column", sm: "row", md: "row", lg: "row", } }}>
                                <Box sx={{ p: 2, width: '100%', maxWidth: 500 }}>
                                    <img src={`${assetUrl}/bin/${bin.image}`} alt={bin.name} width="100%" />
                                </Box>
                                <Box sx={{ py: 2, minWidth: 300, width: "100%", maxWidth: 500 }}>
                                    <Box sx={{ textAlign: 'start', mb: 1, }}>
                                        {/* status, speed, weight, latitude, longitude */}
                                        <List
                                            aria-labelledby="bin-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="bin-list-subheader" sx={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    pr: 0,
                                                }}>
                                                    {t("bin")} {bin.id}
                                                    {
                                                        isAdmin() &&
                                                        <Button
                                                            variant='contained'
                                                            aria-label="edit"
                                                            color="warning"
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => navigate(`/bins/edit/${bin.id}`, { state: bin })}
                                                        >
                                                            {t("bins.edit")}
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
                                                <ListItemText primary="ID" secondary={bin.id} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <ListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Code" secondary={bin.code} />
                                            </ListItem>
                                            <ListItem style={{height: "auto"}} sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <MapIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={t("bins.table.company")}
                                                    secondary={
                                                        bin.company.map((company) => (<div>{company.id + " - " + company.name}</div>))
                                                    }
                                                ></ListItemText>
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <RoomIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.form.position")} secondary={bin.latitude.toFixed(6) + ', ' + bin.longitude.toFixed(6)} />
                                            </ListItem>
                                            {/* <ListItem sx={{ backgroundColor: '#f5f5f5', height: 'max-content' }}>
                                                <ListItemIcon>
                                                    <RoomIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.address")} className="ipcambin" secondary={bin.address} />
                                            </ListItem> */}
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <HeightIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.height")} secondary={bin.height + "m"} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <StraightenIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.length")} secondary={bin?.length + "m"} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <WidthFullIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.width")} secondary={bin.width + "m"} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <ScaleIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.maxWeight")} secondary={bin.maxWeight + ''} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <ColorLensIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.color")} secondary={bin.color + ''} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <AppsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.material")} secondary={bin.material + ''} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <LocalOfferIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.brand")} secondary={bin.brand + ''} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("bins.table.status")} secondary={`${t("bins.table." + bin.status)}`} />
                                            </ListItem>
                                            <ListItem sx={{ height: 'max-content' }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Camera 1"} className="ipcambin" secondary={`${bin.camera1}`} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 'max-content' }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Camera 2"} className="ipcambin" secondary={String(`${bin.camera2}`)} />
                                            </ListItem>
                                            <ListItem sx={{ height: 'max-content' }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Camera 3"} className="ipcambin" secondary={`${bin.camera3}`} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            </Stack>

                            {/* <BinStateLog binId={binId} /> */}
                        </Paper>
                    </Box>
                </Fragment>
            )
            }
        </Box >
    )
}

export default BinItem