import React, { useEffect, useState } from "react";
import {
  getAduanasList,
  getCountriesList,
  getImportProcessList,
} from "../../config/apiClient";
import PaginationModel from "../../config/models/paginationModel";
import "./ImportsInfo.css";
import CountryInfo from "../../config/models/countryInfo";
import AduanaInfo from "../../config/models/aduanaInfo";

const ImportsInfo = () => {
  const [infoImports, setInfoImports] = useState<PaginationModel>({
    count: 0,
    results: [],
  });

  const [countriesList, setCountriesList] = useState<Array<CountryInfo>>([]);

  const [aduanasList, setAduanasList] = useState<Array<AduanaInfo>>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [minRange, setMinRange] = useState<number>(50);

  const [filterParams, setFilterParams] = useState({
    adua: "",
    paispro: "",
    vafodo_min: "",
    vafodo_max: "",
  });

  useEffect(() => {
    setLoading(true);

    getImportProcessList(filterParams)
      .then((data) => {
        if (data) {
          console.log("Se actalizó");
          setInfoImports(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    getCountriesList().then((data) => {
      setCountriesList(data);
    });

    getAduanasList().then((data) => {
      setAduanasList(data);
    });
  }, [filterParams]);

  const handleOnRangeVafodoChange = (event: any) => {
    setMinRange(event.target.value);
  };

  const handleOnCountryProChange = (event: any) => {
    setFilterParams({ ...filterParams, paispro: event.target.value });
  };

  const handleOnClickLoadMore = () => {
    getImportProcessList(filterParams, infoImports.next)
      .then((data) => {
        if (data && data.results) {
          setInfoImports((prev) => ({
            count: data.count,
            next: data.next,
            previous: data.previous,
            results: [...(prev.results || []), ...(data.results || [])],
            total_vafodo: data.total_vafodo,
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleOnAduanaChange = (event: any) => {
    setFilterParams({ ...filterParams, adua: event.target.value });
  };

  return (
    <div>
      <div className="imports-info__head">
        <div className="imports-info__controls">
          <div className="field">
            <label className="label">País de producción</label>
            <div className="select is-primary is-fullwidth">
              <select onChange={handleOnCountryProChange}>
                <option defaultValue="" value={""}>
                  Todos
                </option>
                {countriesList &&
                  countriesList.map((country) => (
                    <option
                      id={`imports-info-country-select-opt-${country.cod}`}
                      value={country.cod}
                    >
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="field">
              <label className="label">Aduanas</label>
              <div className="select is-info is-fullwidth">
                <select onChange={handleOnAduanaChange}>
                  <option defaultValue="" value={""}>
                    Todas
                  </option>
                  {aduanasList &&
                    aduanasList.map((aduana) => (
                      <option
                        id={`imports-info-aduana-select-opt-${aduana.adua}`}
                        value={aduana.adua}
                      >
                        {aduana.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="imports-info__general">
          <div>
            <strong>Total Vafodo: $</strong> {infoImports.total_vafodo}
            <br />
            <strong>Cantidad de procesos:</strong> {infoImports.count}
          </div>
        </div>
      </div>
      <div className="imports-info__table">
        {loading && <p>Cargando ....</p>}
        <div
          className="table-container"
          style={{ height: "100%", overflowY: "scroll" }}
        >
          {!loading && (
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Fecha</th>
                  <th>Aduana</th>
                  <th>País de producción</th>
                  <th>Valor en dólares</th>
                </tr>
              </thead>
              <tbody>
                {infoImports &&
                  infoImports.results &&
                  infoImports.results.map((importP, index) => (
                    <tr id={`importProcessList-i-${importP.id}`}>
                      <td>{index}</td>
                      <td>{importP.fech}</td>
                      <td>{importP.adua.name}</td>
                      <td>{importP.paispro.name}</td>
                      <td>{importP.vafodo}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="imports-info__footer">
        {infoImports.next && (
          <button className="button is-primary" onClick={handleOnClickLoadMore}>
            Cargar más
          </button>
        )}
      </div>
    </div>
  );
};

export default ImportsInfo;
