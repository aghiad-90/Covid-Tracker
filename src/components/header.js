import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "../style/header.css";

function Header({ onchangeCountry, countries, country, worldClick }) {
  return (
    <div className="header">
      <h1>Covid Tracker</h1>
      <FormControl>
        <Select variant="outlined" value={country} onChange={onchangeCountry}>
          <MenuItem value={country} className="drobDown">
            <div onClick={worldClick}>WorldWide</div>
          </MenuItem>
          {countries.map((item) => (
            <MenuItem value={item.value} key={item.country}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
