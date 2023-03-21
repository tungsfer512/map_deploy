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
import { getRoutesByVehicleId } from '../../store/reducers/vehicleSlice';
import ws from './WebSocket';
import RotatedMarker from './RotatedMarker';
import PopupVehicleMarker from './PopupVehicleMarker';
import PopupBinMarker from './PopupBinMarker';
import AlertContent from './AlertContent';
import TabPanelVehicle from './TabPanelVehicle';
import TabPanelItemBin from './TabPanelItemBin';
import axios from 'axios';

// WebSocket init
let id = -1;

const Map1 = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [position, setPosition] = useState([21.0419, 105.821]);
  const [heading, setHeading] = useState(0);
  const [data, setData] = useState([]);
  const [dataAlert, setDataAlert] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bins, setBins] = useState([]);
  const [routes, setRoutes] = useState([]);
  // const [zoom, setZoom] = useState(-1);

  useEffect(() => {
    getBinsData().then((data) => {
      setBins(data);
    });
  }, []);

  useEffect(() => {
    getVehiclesData().then((data) => {
      setVehicles(data);
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // receive data from server

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data received", data);
      if (data[0] === "no-alert") {
        setDataAlert(data);
      }
      else if (data[0] === "alert") {
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
                sx={{ width: "250px" }}
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
      else if (data[0] !== "alert") {
        setData(data);
      }
      // const angle = _getAngle(position[0], position[1], data[1], data[2]);
      // if (Math.abs(angle) !== 90) {
      //   setPosition([data[1], data[2]]);
      //   setHeading(angle);
      // }
    }
  }, []);

  if (!!vehicles && vehicles?.length > 0) {
    let vehicle = vehicles.find(item => item.code.toString() === data[0]);
    if (vehicle) {
      let oldLat = vehicle.latitude;
      let oldLong = vehicle.longitude;
      const angle = _getAngle(oldLat, oldLong, data[1], data[2]);
      if (Math.abs(angle) !== 90) {
        const vehicleData = {
          ...vehicle,
          latitude: data[1],
          longitude: data[2],
          camera: data[3],
          angle: angle
        }
        const vehiclesUpdate = [...vehicles.filter(item => item.id.toString() !== data[0]), vehicleData];
        // if (routes.length > 0) {
        //   if (L.latLng(data[1], data[2]).distanceTo(L.latLng(routes[0].demand.latitude, routes[0].demand.longitude)) < 5) {
        //     routes.shift()
        //     setRoutes(routes)
        //   }
        // }
        setVehicles(vehiclesUpdate);
      }
    }
  }

  useEffect(() => {
    if (dataAlert[0] === "alert" || dataAlert[0] === "no-alert") {
      if (!!bins && bins?.length > 0) {
        let bin = bins.find(item => item.code.toString() === dataAlert[1].code.toString());
        if (bin) {
          const binData = {
            ...bin,
            status: dataAlert[1].status
          }
          const binsUpdate = [...bins.filter(item => item.code.toString() !== dataAlert[1].code.toString()), binData];
          setBins(binsUpdate);
          console.log("update bin in map");
        }
      }
    }
    // if (dataAlert[0] === "alert") {
    //   let binCoor = L.latLng(dataAlert[1]['latitude'], dataAlert[1]['longitude']);
    //   for (let vehicle of vehicles) {
    //     let vehicleCoor = L.latLng(vehicle['latitude'], vehicle['longitude']);
    //     if (binCoor.distanceTo(vehicleCoor) < 5) {
    //       // axios.get('path/to/reset/bin/weight')
    //       break;
    //     }
    //   }
    // }
  }, [dataAlert]);

  const [openVehicle, setOpenVehicle] = useState(false);
  const [openBin, setOpenBin] = useState(false);
  const [item, setItem] = useState({});

  const handleClickOpenVehicle = (e, item) => {
    setOpenVehicle(true);
    setItem(item);
    if (openBin) setOpenBin(false);


  };

  const handleClickOpen = async (e, vehicle) => {
    // if (showWaypoints) {
    var allLeafletElements = document.querySelector(".leaflet-container .leaflet-overlay-pane svg path");
    if (allLeafletElements) {
      console.log("remove waypoints");
      console.log(allLeafletElements);
      allLeafletElements.remove();
    }
    if (id !== vehicle.id) {
      id = vehicle.id;
      //   setShowWaypoints(false);
      // }
      // else {
      //   setShowWaypoints(true);
      // }
      let routeData = await getRoutesByVehicleId(vehicle.id);
      console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", routeData);

      const route = routeData.map((item, index) => {
        // console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", item);
        return [
          item?.demand?.latitude,
          item?.demand?.longitude
        ]
      })

      route.push([vehicle.latitude, vehicle.longitude])
      console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", route);
      setRoutes(route);
    }
    else {
      var allLeafletElements = document.querySelector(".leaflet-container .leaflet-overlay-pane svg path");
      if (allLeafletElements) {
        console.log("remove waypoints");
        console.log(allLeafletElements);
        allLeafletElements.remove();
      }
      id = -1
    }
    // goi api lay routes --> set state cho mang routes --> lay routing machine cho 2 diem 1 --> neu di den diem cuoi thi set lai state mang routes = routes[1:] --> xoa tat ca layer routing --> lay routing moi
  }

  const handleCloseVehicle = (e) => {
    setOpenVehicle(false);
    setItem({});
  };

  const handleClickOpenBin = (e, item) => {
    setOpenBin(true);
    setItem(item);
    if (openVehicle) setOpenVehicle(false);
  };

  const handleCloseBin = (e) => {
    setOpenBin(false);
    setItem({});
  };

  const iconxeUrl = green_vehicle;
  const iconXe = new L.Icon({ iconUrl: iconxeUrl, iconSize: [35, 16], className: "leaflet-rotated-icon-move-smoothing" });
  const iconBinGreenUrl = green_bin;
  const iconBinRedUrl = red_bin;
  const iconBinYellowUrl = yellow_bin;
  const iconBinGreen = new L.Icon({ iconUrl: iconBinGreenUrl, iconSize: [16, 24] })
  const iconBinRed = new L.Icon({ iconUrl: iconBinRedUrl, iconSize: [16, 24] })
  const iconBinYellow = new L.Icon({ iconUrl: iconBinYellowUrl, iconSize: [16, 24] })

  // const map = useMap();
  // const leafletElement = L.Routing.control({
  //   waypoints: [],
  //   routeWhileDragging: true,
  //   show: false,
  //   createMarker: () => null,
  //   lineOptions: {
  //     styles: [{ color: "red", opacity: 1, weight: 5 }]
  //   }
  // }).addTo(map);

  return (
    <Fragment>
      <Box sx={{ position: 'relative', with: '100%' }}>
        <Box sx={{ height: "calc(100vh - 64px - 5px)" }}>
          <MapContainer center={[21.023396, 105.850094]} zoom={17} style={{ height: "inherit" }} scrollWheelZoom={true}

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

            {!!vehicles && vehicles.map((vehicle) => (
              <RotatedMarker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={iconXe} rotationOrigin="center" rotationAngle={vehicle.angle}
                eventHandlers={{
                  click: (e) => handleClickOpen(e, vehicle),
                }}
              >
                <PopupVehicleMarker vehicle={vehicle} handleClickOpen={handleClickOpenVehicle} />
              </RotatedMarker>
            ))}

            {!!bins && bins.map((bin) => (
              <RotatedMarker key={bin.id} position={[bin.latitude, bin.longitude]} icon={bin.status === "full" ? iconBinRed : bin.status === "empty" ? iconBinGreen : iconBinYellow}>
                <PopupBinMarker bin={bin} handleClickOpen={handleClickOpenBin} />
              </RotatedMarker>
            ))}

            <Routing dataWaypoints={routes} id={id}></Routing>
          </MapContainer>
        </Box>
        <TabPanelItemBin open={openBin} handleClose={handleCloseBin} item={item} ></TabPanelItemBin>
        <TabPanelVehicle open={openVehicle} handleClose={handleCloseVehicle} item={item} ></TabPanelVehicle>
      </Box>
    </Fragment>
  )
}


export default Map1