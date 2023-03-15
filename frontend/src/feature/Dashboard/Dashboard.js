import { Typography, Box, Stack, Breadcrumbs, Link } from '@mui/material';
import { Fragment } from 'react';
import { DataTable } from '../../components/DataTable';
import BarChart from './BarChart';
import MyPieChart from './PieChart';
import MyLineChart from './LineChart';
import PercentAreaChart from './PercentAreaChart';
import { useTranslation } from 'react-i18next';

import DataBinEvent from './DataBinEvent';
import DataVehicleEvent from './DataVehicleEvent';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const { t, i18n } = useTranslation();
    return (
        <Fragment>
            <Box sx={{
                height: 'auto',
                py: 4,
                pt: 6,
                px: 2,
                maxWidth: 1200,
                margin: '0 auto',
            }} >
                <Box sx={{
                    // height: 300,
                    width: '100%',
                    '& .super-app-theme--header': {
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '600',
                    }
                }}
                >
                    <Stack direction='row'
                        sx={{
                            py: { xs: 1, md: 3 },
                            pt: { xs: 0, md: 0 },
                            px: 0,
                            justifyContent: {
                                xs: "center",
                                sm: "space-between",
                                md: "space-between",
                                lg: "space-between",
                            },
                            alignItems: {
                                xs: "space-between",
                                sm: "center",
                                md: "center",
                                lg: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                                md: "row",
                                lg: "row",
                            },
                        }}>
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                            {t('dashboard.welcome')}, {user.firstName} {user.lastName}
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                {t('dashboard.home')}
                                </Link>
                                <Typography color="text.primary">{t('dashboard.pageName')}</Typography>
                            </Breadcrumbs>
                        </Typography>
                    </Stack>
                    <Box sx={{
                        height: '150px',
                        // maxWidth: '1200px',
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: "space-evenly",
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            // maxWidth: '300px',
                            background: '#c8facd',
                            height: '100%',
                            // background: "#ccc",
                            flex: '1',
                            margin: '0 10px',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: '16px !important'
                        }}>
                            <Box sx={{
                                alignSelf: 'start !important',
                                marginLeft: '20px',
                                marginTop: '10px',
                                fontSize: '20px',
                                fontWeight: 600,
                            }}>{t('bin')}</Box>
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                <Box sx={{
                                    flex: 1,
                                    height: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}>
                                    <Box>Đã đầy</Box>
                                    <Box sx={{
                                        fontSize: '35px',
                                        fontWeight: 900,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }}>12</Box>
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    height: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}>
                                    <Box>Tổng số</Box>
                                    <Box sx={{
                                        fontSize: '35px',
                                        fontWeight: 900,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }}>48</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            // maxWidth: '300px',
                            background: '#cafdf5',
                            height: '100%',
                            // background: "#ccc",
                            flex: '1',
                            margin: '0 10px',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: '16px !important'
                        }}>
                            <Box sx={{
                                alignSelf: 'start !important',
                                marginLeft: '20px',
                                marginTop: '10px',
                                fontSize: '20px',
                                fontWeight: 600,
                            }}>{t('vehicle')}</Box>
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                <Box sx={{
                                    flex: 1,
                                    height: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}>
                                    <Box>Khả dụng</Box>
                                    <Box sx={{
                                        fontSize: '35px',
                                        fontWeight: 900,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }}>5</Box>
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    height: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}>
                                    <Box>Tổng số</Box>
                                    <Box sx={{
                                        fontSize: '35px',
                                        fontWeight: 900,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }}>10</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            // maxWidth: '300px',
                            background: '#fff5cc',
                            height: '100%',
                            // background: "#ccc",
                            flex: '1',
                            margin: '0 10px',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: '16px !important'
                        }}>
                            <Box sx={{
                                alignSelf: 'start !important',
                                marginLeft: '20px',
                                marginTop: '10px',
                                fontSize: '20px',
                                fontWeight: 600,
                            }}>{t('driver')}</Box>
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                <Box sx={{
                                    flex: 1,
                                    height: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}>
                                    <Box sx={{
                                        fontSize: '35px',
                                        fontWeight: 900,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }}>10</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            // maxWidth: '300px',
                            background: '#ffe9d5',
                            height: '100%',
                            // background: "#ccc",
                            flex: '1',
                            margin: '0 10px',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: '16px !important'
                        }}>
                            <Box sx={{
                                alignSelf: 'start !important',
                                marginLeft: '20px',
                                marginTop: '10px',
                                fontSize: '20px',
                                fontWeight: 600,
                            }}>Tổng khối lượng rác</Box>
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                <Box sx={{
                                    flex: 1,
                                    height: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}>
                                    <Box sx={{
                                        fontSize: '35px',
                                        fontWeight: 900,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }}>90432</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        height: 'auto',
                        maxWidth: 1200,
                        margin: '30px auto',
                    }} >
                        <Box
                            fontSize={'20px'}
                            fontWeight={500}
                            margin={'20px 0 10px'}
                        >
                            {t('dashboard.chartTitle1')}
                        </Box>
                        <PercentAreaChart></PercentAreaChart>
                    </Box>

                    <Box sx={{
                        height: 'auto',
                        maxWidth: 1200,
                        margin: '30px auto',
                    }} >
                        <Box style={{ display: "flex" }}>
                            <Box>
                                <Box
                                    fontSize={'20px'}
                                    fontWeight={500}
                                    margin={'20px 0 10px'}
                                >
                                    {t('dashboard.chartTitle2')}
                                </Box>
                                <BarChart></BarChart>
                            </Box>
                            <Box>
                                <Box
                                    fontSize={'20px'}
                                    fontWeight={500}
                                    margin={'20px 0 10px'}
                                >
                                    {t('dashboard.chartTitle3')}
                                </Box>
                                <MyPieChart></MyPieChart>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        height: 'auto',
                        maxWidth: 1200,
                        margin: '30px auto',
                    }} >
                        <Box
                            fontSize={'20px'}
                            fontWeight={500}
                            margin={'20px 0 10px'}
                        >
                            {t('dashboard.chartTitle4')}
                        </Box>
                        <MyLineChart></MyLineChart>
                    </Box>

                    <Box sx={{
                        maxWidth: 1200,
                        margin: '30px auto',
                    }} >
                        <Box
                            fontSize={'20px'}
                            fontWeight={500}
                            margin={'20px 0'}
                        >
                            {t('dashboard.chartTitle5')}
                        </Box>
                        {/* <DataTable rows={} columns={} /> */}
                        <DataVehicleEvent />
                        <DataBinEvent />
                    </Box>
                </Box>
            </Box>
        </Fragment >
    )
}

export default Dashboard