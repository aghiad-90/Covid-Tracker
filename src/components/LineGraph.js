import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import url from "../utilities/endpoints";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChart = (data, TypeCases) => {
  const dataChart = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[TypeCases][date] - lastDataPoint,
      };
      dataChart.push(newDataPoint);
    }

    lastDataPoint = data[TypeCases][date];
  }

  return dataChart;
};

function LineGraph({ TypeCases }) {
  const [data, setdata] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url.histprical)
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChart(data, TypeCases);
          setdata(chartData);
        });
    };
    fetchData();
  }, [TypeCases]);
  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
