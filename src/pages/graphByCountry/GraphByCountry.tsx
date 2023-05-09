import React, { useEffect, useState } from "react";
import "./GraphByCountry.css";
import CountByCountry from "../../config/models/countByCountry";
import { getCountByCountry } from "../../config/apiClient";
import { VictoryPie } from "victory-pie";

const myData = [
  { x: "Group A", y: 900 },
  { x: "Group B", y: 400 },
  { x: "Group C", y: 300 },
];

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color);

  return color;
};

const GraphByCountry = () => {
  const [infoByCountry, setInfoByCountry] = useState<Array<CountByCountry>>([]);
  const [colors, setColors] = useState<Array<string>>([]);

  useEffect(() => {
    getCountByCountry()
      .then((data) => {
        let info: Array<CountByCountry> = data.slice(0, 12);
        info.push({
          paispro__name: "Otros",
          sum_vafodo: data
            .slice(-(data.length - 12))
            .reduce((acc, info) => acc + info.sum_vafodo, 0),
        });
        const randomColors = info.map(() => randomColor());
        setColors(randomColors);
        setInfoByCountry(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="graph_by_country">
      <h1>Porcentaje de VAFODO por país</h1>
      <div className="chart-container">
        {infoByCountry && (
          <VictoryPie
            data={infoByCountry.map((info) => ({
              x: info.paispro__name,
              y: info.sum_vafodo,
            }))}
            colorScale={colors}
            radius={100}
          />
        )}
      </div>
    </div>
  );
};
export default GraphByCountry;
