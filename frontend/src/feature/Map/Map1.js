import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl, LayerGroup, useMapEvent, useMap, useMapEvents } from "react-leaflet";
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

import { useDispatch, useSelector } from 'react-redux';
import { addNoti, increment } from '../../store/reducers/notiSlice';
import { getRoutesByVehicleId } from '../../store/reducers/vehicleSlice';
import ws from './WebSocket';
import RotatedMarker from './RotatedMarker';
import PopupVehicleMarker from './PopupVehicleMarker';
import PopupBinMarker from './PopupBinMarker';
import AlertContent from './AlertContent';
import AlertAPIContent from './AlertAPIContent';
import TabPanelVehicle from './TabPanelVehicle';
import TabPanelItemBin from './TabPanelItemBin';
import axios from 'axios';
import { getResetBinWeightAsync } from '../../store/reducers/binSlice';
import { clearWayPoints, setWayPoints, waypointsSelector } from '../../store/reducers/waypointSlice';
import { isStaff } from '../Auth/Role';
let id = -1;

function ZoomHandler({ waypoints }) {
  const [zoomLevel, setZoomLevel] = useState(17); // initial zoom level provided for MapContainer
  const map = useMap();
  useMapEvents({
    zoomend: () => {
      if (waypoints.oldVehicleId === null) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1;
      }
    },
    zoomstart: () => {
      if (waypoints.oldVehicleId === null) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1;
      }
      setZoomLevel(map.getZoom());
    },
    zoomlevelschange: () => {
      if (waypoints.oldVehicleId === null) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1;
      }
    },
  });
  return null
}

// WebSocket init

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
  const [openVehicle, setOpenVehicle] = useState(false);
  const [openBin, setOpenBin] = useState(false);
  const [item, setItem] = useState({});
  const [itemBin, setItemBin] = useState({});
  const [itemVehicle, setItemVehicle] = useState({});

  // const [zoom, setZoom] = useState(-1);

  useEffect(() => {
    if (!isStaff()) {
      getBinsData().then((data) => {
        setBins(data);
      });
    } else {
      const user = localStorage.getItem('user')
      getBinsData(JSON.parse(user)?.companyId).then((data) => {
        setBins(data);
      });
    }
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
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 3000,
            content: (key, message) => (
              <Alert
                key={key}
                message={message}
                severity="warning"
                color="warning"
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
      else if (data[0] === 'alert_api') {
        enqueueSnackbar(JSON.stringify(data),
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
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
                <AlertAPIContent data={data[1]} />
              </Alert>
            ),
          });
      }
      else {
        setData(data);
      }
      // const angle = _getAngle(position[0], position[1], data[1], data[2]);
      // if (Math.abs(angle) !== 90) {
      //   setPosition([data[1], data[2]]);
      //   setHeading(angle);
      // }
      // setItem(item);
    }
  }, []);

  useEffect(() => {
    if (data[0] !== "alert" && data[0] !== "no-alert") {
      if (!!vehicles && vehicles?.length > 0) {
        let vehicle = vehicles.find(item => item.id.toString() === data[0].toString());
        if (vehicle) {
          let oldLat = vehicle.latitude;
          let oldLong = vehicle.longitude;
          const angle = _getAngle(oldLat, oldLong, data[1], data[2]);
          if (Math.abs(angle) !== 90) {
            console.log("data4-----------____----__---__---___--___---------");
            const vehicleData = {
              ...vehicle,
              latitude: data[1],
              longitude: data[2],
              camera: data[3],
              angle: angle
            }
            const vehiclesUpdate = [...vehicles.filter(item => item.id.toString() !== data[0].toString()), vehicleData];
            for (let bin of bins) {
              if (bin.status === "full") {
                let binCoor = L.latLng(bin.latitude, bin.longitude);
                let vehicleCoor = L.latLng(data[1], data[2]);
                let distance = binCoor.distanceTo(vehicleCoor);
                if (distance < 5) {
                  dispatch(getResetBinWeightAsync(bin.id));
                  console.log("reset bin weight");
                }
              }
            }
            setVehicles(vehiclesUpdate);
            if (data[0]?.toString() === itemVehicle?.id?.toString()) {
              setItemVehicle(vehicleData);
            }
          } else {
            console.log("data5-----------____----__---__---___--___---------");
            const vehicleData = {
              ...vehicle,
              camera: data[3],
            }
            const vehiclesUpdate = [...vehicles.filter(item => item.id.toString() !== data[0].toString()), vehicleData];
            if (data[0]?.toString() === itemVehicle?.id?.toString()) {
              setItemVehicle(vehicleData);
            }
            setVehicles(vehiclesUpdate);
          }
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataAlert[0] === "alert" || dataAlert[0] === "no-alert") {
      if (!!bins && bins?.length > 0) {
        let bin = bins.find(item => item.id.toString() === dataAlert[1].id.toString());
        if (bin) {
          const binData = {
            ...bin,
            status: dataAlert[1].status
          }
          const binsUpdate = [...bins.filter(item => item.id.toString() !== dataAlert[1].id.toString()), binData];
          if (dataAlert[1]?.id?.toString() === itemBin?.id?.toString()) {
            setItemBin(binData)
          }
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

  const handleClickOpenVehicle = (e, item) => {
    console.log("click open vehicle", item);
    setOpenVehicle(true);
    setItemVehicle(item);
    if (openBin) setOpenBin(false);


  };

  const waypoints = useSelector(waypointsSelector);

  const handleClickOpen = async (e, vehicle) => {
    // if (showWaypoints) {
    try {
      var allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
      if (allLeafletElements) {
        console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(allLeafletElements);
        let ind = allLeafletElements.length - 1;
        while (ind >= 0) {
          allLeafletElements[ind].remove();
          ind--;
        }
        dispatch(clearWayPoints());
      }
      if (waypoints.oldVehicleId !== vehicle.id) {
        id = vehicle.id;
        try {
          let routeData = await getRoutesByVehicleId(vehicle.id);
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
          const payload = {
            data: route,
            hideInMap: true,
            oldVehicleId: vehicle.id,
          }
          dispatch(setWayPoints(payload))
        } catch (err) {
          console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", err);
          enqueueSnackbar(JSON.stringify(['alert_api', 'Lỗi khi gọi API lấy tuyến đường đi của xe hiện tại']),
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
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
                  <AlertAPIContent data={'Lỗi khi gọi API lấy tuyến đường đi của xe hiện tại'} />
                </Alert>
              ),
            });
        }
      }
      else {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1
        dispatch(clearWayPoints());
      }

      if (vehicle.id === waypoints.oldVehicleId) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1
        dispatch(clearWayPoints());
      }
      // goi api lay routes --> set state cho mang routes --> lay routing machine cho 2 diem 1 --> neu di den diem cuoi thi set lai state mang routes = routes[1:] --> xoa tat ca layer routing --> lay routing moi
      let item_x = {
        ...vehicle,
        routes: ["A", "B", "C", "D"]
      }
      handleClickOpenVehicle(e, item_x);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("waypoints", waypoints);
    if (waypoints.oldVehicleId === null || waypoints.oldVehicleId === id) {
      let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
      if (allLeafletElements) {
        console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
        console.log(allLeafletElements);
        let ind = allLeafletElements.length - 1;
        while (ind >= 0) {
          allLeafletElements[ind].remove();
          ind--;
        }
      }
      id = -1;
    }
  }, [waypoints.oldVehicleId])

  const handleCloseVehicle = (e) => {
    setOpenVehicle(false);
    setItemVehicle({});
  };

  const handleClickOpenBin = (e, item) => {
    setOpenBin(true);
    setItemBin(item);
    if (openVehicle) setOpenVehicle(false);
  };

  const handleCloseBin = (e) => {
    setOpenBin(false);
    setItemBin({});
  };

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
          <MapContainer center={[41.248447, -73.856077]} zoom={9} style={{ height: "inherit" }} scrollWheelZoom={true}

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
                  click: (e) => {
                    if (!openVehicle) {
                      return handleClickOpen(e, vehicle)
                    } else {
                      return handleCloseVehicle(e)
                    }
                  }
                }}
              >
                {/* <PopupVehicleMarker vehicle={vehicle} handleClickOpen={handleClickOpenVehicle} /> */}
              </RotatedMarker>
            ))}

            {!!bins && bins.map((bin) => (
              <RotatedMarker key={bin.id} position={[bin.latitude, bin.longitude]} icon={bin.status === "full" ? iconBinRed : bin.status === "empty" ? iconBinGreen : iconBinYellow}
                eventHandlers={{
                  click: (e) => {
                    if (itemBin?.id?.toString() === bin?.id?.toString()) {
                      return handleCloseBin(e)
                    }
                    return handleClickOpenBin(e, bin)
                  }
                }}
              >
                {/* <PopupBinMarker bin={bin} handleClickOpen={handleClickOpenBin} /> */}

              </RotatedMarker>
            ))}

            {(waypoints.hideInMap === true) && <Routing dataWaypoints={waypoints.data}></Routing>}
            <ZoomHandler waypoints={waypoints} ></ZoomHandler>
          </MapContainer>
        </Box>
        <TabPanelItemBin open={openBin} handleClose={handleCloseBin} item={itemBin} ></TabPanelItemBin>
        <TabPanelVehicle open={openVehicle} handleClose={handleCloseVehicle} item={itemVehicle} ></TabPanelVehicle>
      </Box>
    </Fragment>
  )
}


export default Map1