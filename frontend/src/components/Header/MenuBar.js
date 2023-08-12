import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authSelector, logout } from '../../store/reducers/authSlice';
import { useTranslation } from 'react-i18next';
import LanguagePopover from './LanguagePopover';

import { useEffect } from 'react';
import NotificationPopover from './NotificationPopover';
import useWindowDimensions from '../useWindowDimensions/useWindowDimensions';




export default function Appbar() {
    const { t } = useTranslation();
    const user = JSON.parse(localStorage.getItem('user'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { width } = useWindowDimensions();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    }

    const navigate = useNavigate();


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <LanguagePopover />

            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={0} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>

            <NotificationPopover />

            <Button startIcon={<Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
                {user?.firstName?.charAt(0)}
            </Avatar>}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: "inherit", ml: { xs: 0, sm: 2 }, pr: 1 }}
            >
                {width > 600 ? (!!user ? user.lastName + " " + user.firstName : 'Dang Ngoc Hung') : ''}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>{t("menubar.profile")}</MenuItem>
                <MenuItem onClick={() => handleLogout()}>{t("menubar.logout")}</MenuItem>
            </Menu>
        </Box >
    );
}
