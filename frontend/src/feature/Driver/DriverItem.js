import { Box, Breadcrumbs, Button, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ListIcon from '@mui/icons-material/List';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { assetUrl } from '../../ultils/axiosApi';
import { getDriverDataById } from '../../store/reducers/driverSlice';
import DriverStateLog from './DriverStateLog';
import { useTranslation } from 'react-i18next';
import { isAdmin } from "../Auth/Role"

const DriverItem = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const driverId = parseInt(params.driverId);

    const [driver, setDriver] = useState(
        {
            id: 0,
            firstName: "",
            lastName: "",
            dob: "",
            gender: "",
            email: "",
            phone: "",
            image: "",
        }
    );

    useEffect(() => {
        getDriverDataById(driverId).then((result) => {
            console.log("Result:", result);
            setDriver(result);
        });
    }, [])


    return (
        <Box>
            {driver && (
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
                                {t("drivers.driverDetails")}
                                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                    <Link underline="hover" color="inherit" href="">
                                        {t("drivers.home")}
                                    </Link>
                                    <Link underline="hover" color="inherit" href="/drivers">
                                        {t("drivers.pageName")}
                                    </Link>
                                    <Typography color="text.primary">{driver.lastName + " " + driver.firstName}</Typography>
                                </Breadcrumbs>
                            </Typography>

                            {/* Edit problem item */}

                        </Stack>

                        <Paper elevation={0} sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", }, height: "auto", p: 2, mt: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ mb: 2, pt: 2, flexDirection: { xs: "column", sm: "row", md: "row", lg: "row", } }}>
                                <Box sx={{ p: 2, width: '100%', maxWidth: 500 }}>
                                    <img src={`${assetUrl}/user/${driver.image}`} alt={driver.firstName} width="100%" />
                                </Box>
                                <Box sx={{ py: 2, minWidth: 300, width: "100%", maxWidth: 500 }}>
                                    <Box sx={{ textAlign: 'start', mb: 1, }}>
                                        {/* status, speed, weight, latitude, longitude */}
                                        <List
                                            aria-labelledby="driver-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="driver-list-subheader" sx={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    pr: 0,
                                                }}>
                                                    {t("driver")} {driver.plate}
                                                    {
                                                        isAdmin() &&
                                                        <Button
                                                            variant='contained'
                                                            aria-label="edit"
                                                            color="warning"
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => navigate(`/drivers/edit/${driver.id}`, { state: driver })}
                                                        >
                                                            {t("drivers.edit")}
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
                                                <ListItemText primary={t("drivers.table.id")} secondary={driver.id} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <BadgeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.fullname")} secondary={driver.lastName + " " + driver.firstName} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <DriveFileRenameOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.lastName")} secondary={driver.lastName} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <DriveFileRenameOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.firstName")} secondary={driver.firstName} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <CakeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.dob")} secondary={driver.dob} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    {driver.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.gender")} secondary={driver.gender} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <EmailIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.email")} secondary={driver.email} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <ContactPhoneIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("drivers.table.phone")} secondary={driver.phone} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            </Stack>

                            {/* <DriverStateLog driverId={driverId} /> */}
                        </Paper>
                    </Box>
                </Fragment>
            )}
        </Box>
    )
}

export default DriverItem