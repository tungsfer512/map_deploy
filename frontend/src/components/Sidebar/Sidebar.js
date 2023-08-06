import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PublicIcon from '@mui/icons-material/Public';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useNavigate } from 'react-router-dom';

import useWindowDimensions from "../useWindowDimensions/useWindowDimensions";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SidebarBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const getIndex = (path) => {
    // get first part of path
    const index = path.split('/')[1];
    switch (index) {
        case '':
            return 0;
        case 'dashboard':
            return 1;
        case 'vehicles':
            return 2;
        case 'drivers':
            return 3;
        case 'bins':
            return 4;
        case 'companies':
            return 5;
        case 'alerts':
            return 6;
        default:
            return -1;
    }
}

const Sidebar = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    // console.log(pathname);
    const [selectedIndex, setSelectedIndex] = React.useState(getIndex(pathname));

    const [open, setOpen] = React.useState(true);
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (pathname === '/') {
            setOpen(false);
        }
        // width < 900 ? setOpen(false) : setOpen(true);
        else if (width < 900) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [width, pathname]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedIndex(getIndex(pathname));
    }, [pathname])

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const isAdmin = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return !!user && JSON.parse(user).role.includes('admin');
        } else {
            return false
        }
    }



    return (
        <Stack sx={{
            // display: { xs: 'none', lg: 'flex' },
            display: 'flex',
            position: {
                xs: open ? 'fixed' : 'relative',
                md: 'relative',
                lg: 'relative'
            },
            zIndex: open ? 402 : 1,
            borderRight: {
                xs: open ? '1px solid #e0e0e0' : 'none',
                md: 'relative',
                lg: "none",
            },
            backgroundColor: '#fff',
            minWidth: open ? 280 : 72,
            width: open ? { xs: 0, lg: 280 } : { xs: 0, lg: 72 },
            transition: 'all 0.3s linear',
            height: "100vh",
        }}>
            <SidebarBox p={2} sx={{ p: open ? 2 : 1, py: 1, transition: 'all 0.3s linear', }} >
                <Stack direction="row" spacing={0}
                    sx={{
                        alignItems: 'center',
                        justifyContent: open ? 'space-between' : 'center',
                        height: 48,
                    }}
                >
                    <Link className='' to={"/"} style={{ textDecoration: "none", }}>
                        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, p: 1, whiteSpace: "nowrap", color: "#000", fontWeight: "bold", display: open ? "block" : "none" }}>
                            {t('sidebar.app_name')}
                        </Typography>
                    </Link>

                    <MenuIcon sx={{ display: open ? "none" : "block", color: "#000", fontSize: 28, cursor: "pointer" }} onClick={handleClickOpen} />
                    <MenuOpenIcon sx={{ display: open ? "block" : "none", color: "#000", fontSize: 28, cursor: "pointer" }} onClick={handleClickClose} />
                </Stack>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        component={Link}
                        to={"/"}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}

                    >
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.app_name')} sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/dashboard"}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.dashboard')} sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/vehicles"}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <LocalShippingIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.vehicle')} sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/drivers"}
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.driver')} sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/bins"}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.bin')} sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    {isAdmin() &&
                        <ListItemButton
                            component={Link}
                            to={"/companies"}
                            selected={selectedIndex === 5}
                            onClick={(event) => handleListItemClick(event, 5)}
                        >
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('sidebar.company')} sx={{ display: open ? "block" : "none" }} />
                        </ListItemButton>
                    }
                    <ListItemButton
                        component={Link}
                        to={"/alerts"}
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6)}
                    >
                        <ListItemIcon>
                            <ReportGmailerrorredIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.alerts')} sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                </List>
            </SidebarBox>
        </Stack>
    )
}

export default Sidebar