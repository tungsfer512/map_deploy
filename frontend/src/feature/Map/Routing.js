import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing({ dataWaypoints }) {
  // console.log("dataWaypoints", dataWaypoints);
  const map = useMap();

  const waypoints = dataWaypoints.map((item) => L.latLng([item[0], item[1]]));
  console.log("add waypoints");
  let active = 100;
  for (let i = 0; i < waypoints.length - 1; i++) {
    let leafletElement = null;
    if (i < waypoints.length - 1) {
      if (i == active) {
        leafletElement = L.Routing.control({
          waypoints: [waypoints[i], waypoints[i + 1]],
          routeWhileDragging: true,
          show: false,
          fitSelectedRoutes: false,
          createMarker: () => null,
          lineOptions: {
            styles: [{ color: "#ff0000", opacity: .6, weight: 4, borderRadius: 10 }]
          }
        });
      } else {
        leafletElement = L.Routing.control({
          waypoints: [waypoints[i], waypoints[i + 1]],
          routeWhileDragging: true,
          show: false,
          fitSelectedRoutes: false,
          createMarker: () => null,
          lineOptions: {
            styles: [{ color: "#00b0ff", opacity: .6, weight: 4, borderRadius: 10 }]
          }
        });
      }
    } 
    // else {
    //   if (i == active) {
    //     leafletElement = L.Routing.control({
    //       waypoints: [waypoints[i], waypoints[0]],
    //       routeWhileDragging: true,
    //       show: false,
    //       fitSelectedRoutes: false,
    //       createMarker: () => null,
    //       lineOptions: {
    //         styles: [{ color: "#ff0000", opacity: .6, weight: 4, borderRadius: 10 }]
    //       }
    //     });
    //   } else {
    //     leafletElement = L.Routing.control({
    //       waypoints: [waypoints[i], waypoints[0]],
    //       routeWhileDragging: true,
    //       show: false,
    //       fitSelectedRoutes: false,
    //       createMarker: () => null,
    //       lineOptions: {
    //         styles: [{ color: "#00b0ff", opacity: .6, weight: 4, borderRadius: 10 }]
    //       }
    //     });
    //   }
    // }
    leafletElement.addTo(map);
  }

}
