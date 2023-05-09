import React, { useEffect, useState } from "react";
import "./GraphByCountry.css";
import CountByCountry from "../../config/models/countByCountry";
import { getCountByCountry } from "../../config/apiClient";
import { VictoryPie } from "victory-pie";

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

  const getDataToChart = () => {
    let totalVafodo = infoByCountry.reduce(
      (acc, info) => acc + info.sum_vafodo,
      0
    );
    return infoByCountry.map((info) => ({
      x:
        info.paispro__name +
        `- ${Math.round((info.sum_vafodo * 100) / totalVafodo)} %`,
      y: info.sum_vafodo,
    }));
  };

  return (
    <div className="graph_by_country">
      <h1>Porcentaje de VAFODO por país</h1>
      <div className="chart-container">
        {infoByCountry && (
          <VictoryPie
            data={getDataToChart()}
            colorScale={colors}
            radius={80}
            style={{
              labels: {
                fontSize: "8px",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};
export default GraphByCountry;
