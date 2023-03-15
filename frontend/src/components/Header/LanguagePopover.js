import React, { useState } from 'react'
// material
import vnLogo from '../../asset/language/ic_flag_vn.svg';
import enLogo from '../../asset/language/ic_flag_en.svg';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Menu } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
    {
      value: 'vn',
      label: 'Tiếng Việt',
      icon: vnLogo,
    },
    {
      value: 'en',
      label: 'English',
      icon: enLogo,
    },
  ];

const LanguagePopover = () => {
    const { t, i18n } = useTranslation();
    const [anchorElLanguage, setAnchorElLanguage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleOpenLanguageMenu = (event) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleSelectLanguage = (event, index) => {
        setSelectedIndex(index);
        if (index === 0) {
            i18n.changeLanguage('vn');
        } else {
            i18n.changeLanguage('en');
        }
        setAnchorElLanguage(null);
    };

    const handleCloseLanguageMenu = () => {
        setAnchorElLanguage(null);
    };

    return (
        <Fragment>
            <IconButton
                onClick={handleOpenLanguageMenu}
                sx={{
                    ml: 0,
                    mr: 0,
                    height: 48,
                    width: 48,
                    p: 1,
                    color: 'text.secondary',
                    '&:hover': { bgcolor: alpha('#000000', 0.04), borderRadius: "50%" },
                }}
            >
                <img src={LANGS[selectedIndex].icon} alt="language" style={{width: 24}}/>
            </IconButton>
            <Menu
                id="menu-language"
                anchorEl={anchorElLanguage}
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguageMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {LANGS.map((lang, index) => (
                    <MenuItem
                        key={lang.value}
                        selected={index === selectedIndex}
                        onClick={(event) => handleSelectLanguage(event, index)}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <img src={lang.icon} alt="language" />
                            <span>{lang.label}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}

export default LanguagePopover;