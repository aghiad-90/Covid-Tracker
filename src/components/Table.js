import React from "react";
import "../style/tabel.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((item, index) => (
        <tr key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={item.countryInfo.flag}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                objectFit: "cover",
              }}
            />
            <td>{item.country}</td>
          </div>

          <td style={{ fontWeight: "bold" }}>
            {numeral(item.cases).format("0,0")}
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
