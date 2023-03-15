import { React, Fragment, useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { countSelector, setCount, setNoti, notiSelector, setPosition } from '../../store/reducers/notiSlice';
import { Badge, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { red_bin, green_vehicle } from '../../feature/Map/constants';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box } from '@mui/system';

const NotificationPopover = () => {
    const { t } = useTranslation();
    const [anchorElNoti, setAnchorElNoti] = useState(null);
    const openNoti = Boolean(anchorElNoti);

    if (JSON.parse(localStorage?.getItem('noti'))?.length > 30) {
        localStorage.setItem('noti', JSON.stringify(JSON.parse(localStorage?.getItem('noti')).slice(0, 30)))
    }

    const dispatch = useDispatch();
    const noti = useSelector(notiSelector);
    const countNoti = useSelector(countSelector);
    // console.log("count", countNoti);
    //     console.log("noti", noti);

    useEffect(() => {
        if (localStorage.getItem('noti') !== null) {
            dispatch(setNoti(JSON.parse(localStorage.getItem('noti'))));
        }
        if (localStorage.getItem('countNoti') !== null) {
            dispatch(setCount(JSON.parse(localStorage.getItem('countNoti'))));
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('noti') && !localStorage.getItem('countNoti')) {
            localStorage.setItem('noti', JSON.stringify(noti));
            localStorage.setItem('countNoti', JSON.stringify(countNoti));
        }
        if (noti?.length > 0) {
            localStorage.setItem('noti', JSON.stringify(noti));
        }

        if (countNoti > 0) {
            localStorage.setItem('countNoti', JSON.stringify(countNoti));
        }
    }, [noti, countNoti]);

    const handleClickNotification = (e) => {
        setAnchorElNoti(e.currentTarget);
    };

    const handleCloseNotification = (data) => {
        dispatch(setCount(0));
        localStorage.setItem('countNoti', JSON.stringify(0));
        console.log(data);
        if (!!data) {
            dispatch(setPosition([data[1].latitude, data[1].longitude]))
        }
        setAnchorElNoti(null);
    };

    return (
        <Fragment>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClickNotification}
            >
                <Badge badgeContent={
                    countNoti ? countNoti : 0
                } color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                sx={{
                    width: 360,
                    height: "auto",
                    "& .MuiList-root": {
                        // width: 360,
                        width: "100%",
                        height: "auto",
                        maxHeight: !!noti && noti?.length > 0 ? 362 : 48,
                        overflowY: "scroll",
                    }
                }}
                open={openNoti}
                onClose={() => handleCloseNotification(null)}
                anchorEl={anchorElNoti}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                keepMounted
            >
                {/* map reverse noti */}
                {!!noti && noti?.length > 0 ? noti.map((data, index) => {
                    // if (index < 5) {
                    return (
                        <MenuItem key={index} onClick={() => handleCloseNotification(data)}
                            sx={{
                                bgcolor: index < countNoti ? "#f5f5f5" : "#fff",
                            }}
                        >
                            <Box sx={{ with: 32, height: 35, mr: 2, flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={data[3] === "bin" ? red_bin : green_vehicle}
                                    sx={{
                                        width: data[3] === "bin" ? 24 : 35,
                                        height: data[3] === "bin" ? 32 : 16,
                                        borderRadius: 0
                                    }}
                                />
                            </Box>

                            <Stack spacing={0} direction="column" sx={{
                                flex: 1,
                            }}>
                                <Typography variant='caption' component='div' sx={{ width: "100%" }}>
                                    <strong>{t("map.event")}: </strong> {data[2]}
                                </Typography>
                                {
                                    data[1]?.weight && <Typography variant='caption' component='div'>
                                        <strong>{t("vehicles.form.weight")}:</strong> {data[1]?.weight} kg
                                    </Typography>
                                }
                                <Typography variant='caption' component='div' sx={{ width: "100%" }}>
                                    <strong>{t("vehicles.form.position")}:</strong> {data[1].latitude.toFixed(4) + " " + data[1].longitude.toFixed(4)}
                                </Typography>
                                <Typography variant='caption' component='div' sx={{ width: "100%" }}>
                                    <strong>{t("tableLog.time")}:</strong> {String(data[1].updatedAt).slice(0, 19).replace("T", " ")}
                                </Typography>
                            </Stack>


                        </MenuItem>
                    )
                    // }
                })
                    : (
                        <MenuItem onClick={() => handleCloseNotification(null)}>
                            <Typography variant='caption' component='div' sx={{ width: "100%" }}>
                                {t("map.noEvent")}
                            </Typography>
                        </MenuItem>
                    )
                }
            </Menu>
        </Fragment>
    )
}

export default NotificationPopover