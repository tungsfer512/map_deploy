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

  // var allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
  // if (allLeafletElements) {
  //   console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX4");
  //   console.log(allLeafletElements);
  //   let ind = allLeafletElements.length - 1;
  //   while (ind >= 0) {
  //     allLeafletElements[ind].remove();
  //     ind--;
  //   }
  // }
  // if (id == -1) {
  //   return;
  // }

  // else {
  console.log("add waypoints");
  const leafletElement = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: true,
    show: false,
    createMarker: () => null,
    lineOptions: {
      styles: [{ color: "red", opacity: 1, weight: 5 }]
    }
  });
  leafletElement.addTo(map);


}
