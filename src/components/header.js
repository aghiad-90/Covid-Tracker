import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "../style/header.css";

function Header({ onchangeCountry, countries, country }) {
  return (
    <div className="header">
      <h1>Covid Tracker</h1>
      <FormControl>
        <Select variant="outlined" value={country} onChange={onchangeCountry}>
          <MenuItem
            value={country}
            style={{ backgroundColor: "white" }}
            className="drobDown"
          >
            WorldWide
          </MenuItem>
          {countries.map((item) => (
            <MenuItem value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
