"use client";


import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { Icon } from "leaflet";

export default function Map() {
  const position: [number, number] = [33.7925156, -117.9981178] /* Jonathans house lol*/;
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [20, 20]
  })

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-2xl">
      <MapContainer center={position} zoom={10} className="h-full w-full">
        {/* <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <TileLayer 
          attribution="Jawg Sunny"
          url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=YfepSyXzEcoaGYKGYGhr2gwmwKQpCjjQJepX71Y5ZjB2X0zaRCcYQVqIZp4QRvKs"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Jonathan LOL</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}