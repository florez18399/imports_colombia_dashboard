import React, { useEffect, useState } from "react";
import "./GraphByCity.css";

import { VictoryBar } from "victory-bar";
import CountByCity from "../../config/models/countByCity";
import { getCountByCity } from "../../config/apiClient";
import { VictoryChart } from "victory-chart";
import { VictoryTheme } from "victory";

const GraphByCity = () => {
  const [infoByCity, setInfoByCity] = useState<Array<CountByCity>>([]);

  useEffect(() => {
    getCountByCity()
      .then((data) => {
        console.log("Infooo" + JSON.stringify(data[0]));
        if (data) {
          setInfoByCity(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="graph_by_country">
      <h1>Procesos de importación por ciudad</h1>
      <div
        style={{
          width: "80%",
          height: "600px",
          display: "flex",
          alignContent: "center",
        }}
      >
        {infoByCity && (
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              alignment="start"
              data={infoByCity
                .slice(0, 15)
                .reverse()
                .map((info) => ({
                  x: info.cuidaexp,
                  y: info.num_procesos,
                }))}
              horizontal
            />
          </VictoryChart>
        )}
      </div>
    </div>
  );
};
export default GraphByCity;
