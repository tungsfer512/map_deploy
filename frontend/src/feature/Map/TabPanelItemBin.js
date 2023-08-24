import * as React from 'react';
import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';

import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { assetUrl } from '../../ultils/axiosApi';
import Hls from 'hls.js'
import ReactPlayer from 'react-player';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ height: '225px' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

let handleViewCamera = (id) => {
    setTimeout(() => {
        if (Hls.isSupported()) {
            var video = document.getElementById(`video${id}`);
            console.log(`check video${id}`, video);
            var hls = new Hls();
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                console.log('video tag and hls.js are now bound together !');
            });
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                    'manifest loaded, found ' + data.levels.length + ' quality level'
                );
            });
            hls.loadSource('https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8');
            // bind them together
            hls.attachMedia(video);
            video.play();
        }

    }, 2000)
}



export default function TabPanelItemBin({ open, handleClose, item }) {
    const { t } = useTranslation();
    // console.log(item);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!!item && open) {
        return (
            <Box sx={{
                width: "100%",
                height: open ? "274px" : 0,
                backgroundColor: open ? "white" : "#f5f5f5",
                position: 'absolute',
                bottom: 0,
                zIndex: 1001,
                transition: "height 0.3s ease-in-out",
            }}>
                <Box sx={{ width: '100%', height: "inherit" }}>
                    <CloseIcon
                        sx={{
                            position: 'absolute',
                            top: '12px',
                            right: '4px',
                            fontSize: '28px',
                            color: '#6f6f6f',
                            cursor: 'pointer',
                            zIndex: 401,
                        }}
                        onClick={handleClose}
                    />
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                            sx={{
                                '& .MuiTabs-flexContainer': {
                                    flexDirection: { xs: "column", sm: "row" }
                                }
                            }}
                        >
                            <Tab label={t("bin")} {...a11yProps(0)} />
                            {/* <Tab label={t("map.events")} {...a11yProps(1)} /> */}
                            {/* <Tab label={t("map.cameras1")} {...a11yProps(2)} onClick={() => handleViewCamera(1)} />
                            <Tab label={t("map.cameras2")} {...a11yProps(3)} onClick={() => handleViewCamera(2)} />
                            <Tab label={t("map.cameras3")} {...a11yProps(4)} onClick={() => handleViewCamera(3)} /> */}
                            <Tab label={t("map.cameras1")} {...a11yProps(1)} />
                            <Tab label={t("map.cameras2")} {...a11yProps(2)} />
                            <Tab label={t("map.cameras3")} {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: { xs: 'flex-start', sm: 'space-evenly' },
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <List
                                sx={{
                                    display: 'flex',
                                    flexGrow: 1,
                                    flexDirection: 'column',
                                    flexWrap: { xs: 'nowrap', sm: 'wrap' },
                                    height: 230,
                                    pb: 0,
                                    maxWidth: 1200,
                                    overflowX: 'hide',
                                    overflowY: 'auto',
                                    "& .MuiListItem-root": {
                                        height: { xs: 60, sm: 40 },
                                        width: { xs: "100%", sm: 360 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    },
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
                                {/* for in item */}
                                <>
                                    <ListItem sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <ListIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="ID" secondary={item.id} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                        <ListItemIcon>
                                            <ListIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.weight")} secondary={`${(item.weight/1000).toFixed(3)} Kg`} />
                                    </ListItem>
                                    <ListItem style={{ height: "auto" }} sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <MapIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t("bins.table.company")}
                                            secondary={
                                                item.company.map((company) => (<div>{company.id + " - " + company.name}</div>))
                                            }
                                        ></ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                        <ListItemIcon>
                                            <RoomIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.form.position")} secondary={item.latitude.toFixed(6) + ', ' + item.longitude.toFixed(6)} />
                                    </ListItem>
                                    {/* <ListItem sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <RoomIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.address")} secondary={item.address} />
                                    </ListItem> */}
                                    <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                        <ListItemIcon>
                                            <HeightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.height")} secondary={item.height + "m"} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <StraightenIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.length")} secondary={item?.length + "m"} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                        <ListItemIcon>
                                            <WidthFullIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.width")} secondary={item.width + "m"} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <ScaleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.maxWeight")} secondary={`${(item.maxWeight/1000).toFixed(3)} Kg`} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                        <ListItemIcon>
                                            <ColorLensIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.color")} secondary={item.color + ''} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <AppsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.material")} secondary={item.material + ''} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                        <ListItemIcon>
                                            <LocalOfferIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.brand")} secondary={item.brand + ''} />
                                    </ListItem>
                                    <ListItem sx={{ width: 360, height: 40 }}>
                                        <ListItemIcon>
                                            <AutorenewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("bins.table.status")} secondary={`${t("bins.table." + item.status)}`} />
                                    </ListItem>
                                </>
                            </List>
                            <Box sx={{ p: 2, width: 282, height: 196, maxWidth: 500 }}>
                                <Typography variant="p" component="h6" sx={{ mb: 1, fonWeight: 600 }}>
                                    {t('bins.form.image')}
                                </Typography>
                                <img src={`${assetUrl}/bin/${item.image}`} alt={item.name} width="100%" height="100%" />
                            </Box>
                        </Box>
                    </TabPanel>
                    {/* <TabPanel value={value} index={1}>
                        Events
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={2}>
                        <video id='video1' height={"360px"} width={"640px"} muted controls></video>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <video id='video2' height={"360px"} width={"640px"} muted controls></video>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <video id='video3' width={"1180px"} muted controls></video>
                    </TabPanel> */}
                    <TabPanel value={value} index={1}>
                        <ReactPlayer
                            url={item.camera1}
                            playing={true}
                            volume={1}
                            height="90vh"
                            width="100%"
                            controls={true}
                            muted={true}
                            config={{
                                file: {
                                    attributes: {
                                        preload: "auto",
                                    },
                                },
                            }}
                            playsinline
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ReactPlayer
                            url={item.camera2}
                            playing={true}
                            volume={1}
                            height="90vh"
                            width="100%"
                            controls={true}
                            muted={true}
                            config={{
                                file: {
                                    attributes: {
                                        preload: "auto",
                                    },
                                },
                            }}
                            playsinline
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ReactPlayer
                            url={item.camera3}
                            playing={true}
                            volume={1}
                            height="90vh"
                            width="100%"
                            controls={true}
                            muted={true}
                            config={{
                                file: {
                                    attributes: {
                                        preload: "auto",
                                    },
                                },
                            }}
                            playsinline
                        />
                    </TabPanel>
                </Box>
            </Box>
        );
    }

    else {
        return (<Box sx={{
            width: "100%",
            height: open ? "274px" : 0,
            backgroundColor: open ? "white" : "#f5f5f5",
            position: 'absolute',
            bottom: 0,
            zIndex: 1001,
            transition: "height 0.3s ease-in-out",
        }}>
        </Box>
        );
    }
}