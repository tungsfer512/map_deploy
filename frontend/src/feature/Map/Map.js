import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl, LayerGroup, useMapEvent, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Routing from './Routing';
import "leaflet-rotatedmarker";
import { _getAngle, green_bin, red_bin, yellow_bin, green_vehicle } from './constants';

import { getVehiclesData } from '../../api/vehicle/vehicles';
import { getBinsData } from '../../api/bin/bins';
import { Alert, Box, Typography } from '@mui/material';
import TabPanelItem from './TabPanelItemBin';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { addNoti, increment } from '../../store/reducers/notiSlice';
import ws from './WebSocket';
import RotatedMarker from './RotatedMarker';
import PopupVehicleMarker from './PopupVehicleMarker';
import PopupBinMarker from './PopupBinMarker';
import AlertContent from './AlertContent';
import TabPanelItemBin from './TabPanelItemBin';
import { getDriverDataById } from '../../store/reducers/driverSlice';


// WebSocket init

const Map = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = JSON.parse(localStorage.getItem('user'));

  const [position, setPosition] = useState([21.0419, 105.821]);
  const [heading, setHeading] = useState(0);
  const [data, setData] = useState([]);
  const [dataAlert, setDataAlert] = useState([]);
  const [vehicle, setVehicle] = useState(
    !!auth?.vehicle ? auth?.vehicle : {}
  );
  const [bins, setBins] = useState([]);



  useEffect(() => {
    getDriverDataById(auth?.id).then((data) => {
      setVehicle(data?.vehicle);
      setBins(data?.bins);
      console.log(vehicle);
    });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    // receive data from server

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data received", data);
      if (data[0] !== "alert") {
        setData(data);
      }

      if (data[0] === "alert") {
        enqueueSnackbar(JSON.stringify(data),
          {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 3000,
            content: (key, message) => (
              <Alert
                key={key}
                message={message}
                severity="error"
                color="error"
                onClose={() => closeSnackbar(key)}
                sx={{ width: "240px" }}
                icon={false}
              >
                <AlertContent data={data} />
              </Alert>
            ),
          });

        setDataAlert(data);
        dispatch(addNoti(data));
        dispatch(increment());
      }
      // const angle = _getAngle(position[0], position[1], data[1], data[2]);
      // if (Math.abs(angle) !== 90) {
      //   setPosition([data[1], data[2]]);
      //   setHeading(angle);
      //   console.log(angle);
      // }

    }

  }, []);

  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);


  // useEffect(() => {
  //   if (Hls.isSupported()) {
  //     var video = document.getElementById('video');
  //     console.log("check video", video);
  //     var hls = new Hls();
  //     hls.on(Hls.Events.MEDIA_ATTACHED, function () {
  //       console.log('video tag and hls.js are now bound together !');
  //     });
  //     hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
  //       console.log(
  //         'manifest loaded, found ' + data.levels.length + ' quality level'
  //       );
  //     });
  //     hls.loadSource('https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8');
  //     // bind them together
  //     hls.attachMedia(video);
  //     video.play();
  //   }
  // }, []);

  // socket.onclose = () => {
  //   console.log('Disconnected from server')
  // }

  // console.log('vehicles', vehicles);
  if (!!vehicle && vehicle) {
    console.log(data);
    if (data?.length > 0) {
      let oldLat = vehicle.latitude;
      let oldLong = vehicle.longitude;
      const angle = _getAngle(oldLat, oldLong, data[1], data[2]);
      console.log(angle);
      if (Math.abs(angle) !== 90) {
        const vehicleData = {
          ...vehicle,
          latitude: data[1],
          longitude: data[2],
          angle: angle
        }
        console.log("vehicleData", vehicleData);
        setVehicle(vehicleData);
      }
    }
  }

  // console.log('bins', bins);
  useEffect(() => {
    if (dataAlert[0] === "alert") {
      // console.log("alert", dataAlert);
      if (!!bins && bins?.length > 0) {
        let bin = bins.find(item => item.id.toString() === dataAlert[1].id.toString());
        if (bin) {
          const binData = {
            ...bin,
            status: dataAlert[1].status
          }
          // console.log("bin", binData);
          const binsUpdate = [...bins.filter(item => item.id.toString() !== dataAlert[1].id.toString()), binData];
          setBins(binsUpdate);
        }
      }
    }
  }, [dataAlert]);

  // socket.onclose = () => {
  //   console.log('Disconnected from server')
  // }

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleClickOpen = (e, item) => {
    setOpen(true);
    setItem(item);
    console.log(open);

  };

  const handleClose = (e) => {
    setOpen(false);
    setItem({});
    console.log(open);
  };

  const handleClick = event => {
    console.log(event);
  }

  const iconxeUrl = green_vehicle;
  const iconXe = new L.Icon({ iconUrl: iconxeUrl, iconSize: [35, 16], className: "leaflet-rotated-icon-move-smoothing" });
  const iconBinGreenUrl = green_bin;
  const iconBinRedUrl = red_bin;
  const iconBinYellowUrl = yellow_bin;
  const iconBinGreen = new L.Icon({ iconUrl: iconBinGreenUrl, iconSize: [16, 24] })
  const iconBinRed = new L.Icon({ iconUrl: iconBinRedUrl, iconSize: [16, 24] })
  const iconBinYellow = new L.Icon({ iconUrl: iconBinYellowUrl, iconSize: [16, 24] })

  return (
    <Fragment>
      <Box sx={{ position: 'relative', with: '100%' }}>
        <Box sx={{ height: "calc(100vh - 64px - 5px)" }}>
          <MapContainer center={vehicle ? [auth?.bins[0].latitude, auth?.bins[0].longitude] : [20.9794977, 105.7881109]} zoom={17} style={{ height: "inherit" }} scrollWheelZoom={true}

          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Map Layer Default">
                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {/* <Polyline pathOptions={{ color: 'black' }} positions={dataTemporary} /> */}
            {/* {data[0] === "alert" &&
            } */}
            {/* {!!vehicles && !!bins && <Routing from={[vehicles[3].latitude, vehicles[3].longitude]} to={[bins[5].latitude, bins[5].longitude]} />} */}


            <RotatedMarker key={vehicle.id} position={[vehicle?.latitude, vehicle?.longitude]} icon={iconXe} rotationOrigin="center" rotationAngle={vehicle.angle}
              eventHandlers={{
                click: (e) => { handleClickOpen(e) },
              }}
            >
              {/* <PopupVehicleMarker vehicle={vehicle} handleClickOpen={handleClickOpen} /> */}
            </RotatedMarker>


            {!!bins && bins.map((bin) => (
              <RotatedMarker key={bin.id} position={[bin.latitude, bin.longitude]} icon={bin.status === "full" ? iconBinRed : bin.status === "empty" ? iconBinGreen : iconBinYellow}
                eventHandlers={{
                  click: (e) => { handleClickOpen(e) },
                }}
              >

                {/* <PopupBinMarker bin={bin} handleClickOpen={handleClickOpen} /> */}
              </RotatedMarker>
            ))}

          </MapContainer>
        </Box>

        <TabPanelItemBin open={open} handleClose={handleClose} item={item} ></TabPanelItemBin>
      </Box>
    </Fragment>
  )
}


export default Map