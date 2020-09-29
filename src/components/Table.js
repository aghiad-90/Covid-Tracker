import React from "react";
import "../style/tabel.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((item) => (
        <tr key={item}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={item.countryInfo.flag}
              style={{ height: 30, width: 30, borderRadius: 15 }}
            />
            <td>{item.country}</td>
          </div>
          <strong>
            <td>{numeral(item.cases).format("0,0")}</td>
          </strong>
        </tr>
      ))}
    </div>
  );
}

export default Table;
