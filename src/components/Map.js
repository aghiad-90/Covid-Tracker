import React from "react";
import "../style/map.css";
import { Map as LeafLetMap, TileLayer } from "react-leaflet";
import { showData } from "./../utilities/showdataonMap";

function Map({ center, zoom, countries, casesType }) {
  return (
    <div className="map">
      <LeafLetMap zoom={zoom} center={center}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showData(countries, casesType)}
      </LeafLetMap>
    </div>
  );
}

export default Map;
