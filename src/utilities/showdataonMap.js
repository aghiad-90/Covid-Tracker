import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "../style/map.css";

const casesTypeColors = {
  cases: {
    hex: "#E86043",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#5EC1AC",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#282B2E",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const showData = (countries, casesType) =>
  countries.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.8}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info_container">
          <div
            className="info__flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: 30,
              width: 30,
              borderRadius: "50%",
            }}
          />
          <div>
            <h2>{country.country}</h2>
            <div>
              <strong>
                {casesType} : {numeral(country[casesType]).format("0,0")}
              </strong>
            </div>
          </div>
        </div>
      </Popup>
    </Circle>
  ));
