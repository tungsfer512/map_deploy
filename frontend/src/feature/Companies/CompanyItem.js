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
import { getCompanyDataById } from '../../store/reducers/companySlice';
import { useTranslation } from 'react-i18next';

const CompanyItem = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const companyId = parseInt(params.companyId);

    const [company, setCompany] = useState(
        {
            id: 0,
            name: "",
            address: "",
            email: "",
            phone: "",
            image: "",
        }
    );

    useEffect(() => {
        getCompanyDataById(companyId).then((result) => {
            console.log("Result:", result);
            setCompany(result);
        });
    }, [])


    return (
        <Box>
            {company && (
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
                                {t("companies.companyDetails")}
                                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                    <Link underline="hover" color="inherit" href="">
                                        {t("companies.home")}
                                    </Link>
                                    <Link underline="hover" color="inherit" href="/companies">
                                        {t("companies.pageName")}
                                    </Link>
                                    <Typography color="text.primary">{company.name}</Typography>
                                </Breadcrumbs>
                            </Typography>

                            {/* Edit problem item */}

                        </Stack>

                        <Paper elevation={0} sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", }, height: "auto", p: 2, mt: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ mb: 2, pt: 2, flexDirection: { xs: "column", sm: "row", md: "row", lg: "row", } }}>
                                <Box sx={{ p: 2, width: '100%', maxWidth: 500 }}>
                                    <img src={`${assetUrl}/company/${company.image}`} alt={company.name} width="100%" />
                                </Box>
                                <Box sx={{ py: 2, minWidth: 300, width: "100%", maxWidth: 500 }}>
                                    <Box sx={{ textAlign: 'start', mb: 1, }}>
                                        {/* status, speed, weight, latitude, longitude */}
                                        <List
                                            aria-labelledby="company-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="company-list-subheader" sx={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    pr: 0,
                                                }}>
                                                    {t("company")} {company.plate}
                                                    <Button
                                                        variant='contained'
                                                        aria-label="edit"
                                                        color="warning"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => navigate(`/companies/edit/${company.id}`, { state: company })}
                                                    >
                                                        {t("companies.edit")}
                                                    </Button>
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
                                                }
                                            }}
                                        >
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <ListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("companies.table.id")} secondary={company.id} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <BadgeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("companies.table.name")} secondary={company.name} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <CakeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("companies.table.address")} secondary={company.address} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <EmailIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("companies.table.email")} secondary={company.email} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <ContactPhoneIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("companies.table.phone")} secondary={company.phone} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            </Stack>

                        </Paper>
                    </Box>
                </Fragment>
            )}
        </Box>
    )
}

export default CompanyItem