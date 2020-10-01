import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Lines } from "react-preloaders";

import "./App.css";
import Header from "./components/header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData } from "./utilities/sort";
import url from "./utilities/endpoints";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import Cases from "./icons/virus.svg";
import Recovered from "./icons/recovered.svg";
import Deaths from "./icons/death.svg";

function App() {
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 30.80746, lng: 10.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const CountryURL = url.countries;

  const handleWorldRequest = async () => {
    await fetch(url.all)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setCountry("WorldWide");
        setMapCenter({ lat: 30.80746, lng: 10.4796 });
        setMapZoom(2);
      });
  };

  const onchangeCountry = async (e) => {
    const countryCode = e.target.value;
    const url_all = url.all;
    const url_q = `${url.countryCode}/${countryCode}`;
    const target = countryCode === "WorldWide" ? url_all : url_q;
    await fetch(target)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  useEffect(() => {
    fetch(url.all)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getdata = async () => {
      fetch(CountryURL)
        .then((response) => response.json())
        .then((data) => {
          const countriesApi = data.map((co) => ({
            name: co.country,
            value: co.countryInfo.iso2,
          }));
          setMapCountries(data);
          setCountries(countriesApi);
          const sorted = sortData(data);
          setTableData(sorted);
        });
    };
    getdata();
  }, [CountryURL]);

  return (
    <div className="app">
      <Lines color={"white"} background="#282B2E" />;
      <div className="app__left">
        <Header
          onchangeCountry={onchangeCountry}
          country={country}
          countries={countries}
          worldClick={handleWorldRequest}
        />
        <div className="app__status">
          <InfoBox
            active={casesType === "cases"}
            title="Active"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            color="tomato"
            icon={Cases}
            onClick={(e) => {
              setCasesType("cases");
            }}
          />
          <InfoBox
            title="Reacovery"
            active={casesType === "recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            color="#5EC1AC"
            icon={Recovered}
            onClick={(e) => {
              setCasesType("recovered");
            }}
          />
          <InfoBox
            title="Death"
            active={casesType === "deaths"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            color="#4F4E53"
            icon={Deaths}
            onClick={(e) => {
              setCasesType("deaths");
            }}
          />
        </div>
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3 style={{ color: "white" }}>WorldWide Cases</h3>
          <Table countries={tableData} />
          <h3 style={{ marginBottom: 20, color: "white" }}>
            Live Cases WorldWide
          </h3>
          <LineGraph TypeCases={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
