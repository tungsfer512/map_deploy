import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing({ from, to }) {
  const map = useMap();
  
  const leafletElement = L.Routing.control({
    waypoints: [L.latLng(from), L.latLng(to)],
    routeWhileDragging: true,
    show: false,
    createMarker: () => null,
    lineOptions: {
      styles: [{ color: "red", opacity: 1, weight: 5 }]
    }
  }).addTo(map);

}
