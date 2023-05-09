import React from "react";
import ImportsInfo from "./importsInfo/ImportsInfo";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GraphByCountry from "./graphByCountry/GraphByCountry";
import GraphByCity from "./graphByCity/GraphByCity";

const Home = () => {
  return (
    <div>
      <BrowserRouter>
        <nav
          className="navbar is-warning"
          role="navigation"
          aria-label="main navigation"
        >
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Lista
              </Link>
              <Link className="navbar-item" to="/graphByCountry">
                Gráfico por país
              </Link>
              <Link className="navbar-item" to="/graphByCity">
                Gráfico por ciudad
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="navbar-item" to="/">
                    <strong>Acerca de</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" Component={ImportsInfo} />
          <Route path="/graphByCountry" Component={GraphByCountry} />
          <Route path="/graphByCity" Component={GraphByCity} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Home;
