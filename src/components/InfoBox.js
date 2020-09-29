import React from "react";
import { Typography } from "@material-ui/core";
import numeral from "numeral";
import "../style/infoBox.css";

function InfoBox({ title, cases, total, color, icon, ...props }) {
  return (
    <div className="infoBox" onClick={props.onClick}>
      <div className="infoBox__content">
        <div className="infoBox__icon" style={{ backgroundColor: color }}>
          <img src={icon} />
        </div>
        <div className="infoBox__details">
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="infoBox__cases">{numeral(cases).format("0,0")}</h2>

          <Typography className="infoBox__total" color="textSecondary">
            {numeral(total).format("+0a")}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
