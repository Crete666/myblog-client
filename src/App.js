import "./App.css";
import React, { Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SideLeftComponent from "./sideLeft";
import SideRightComponent from "./sideRight";
import HeaderComponent from "./header";
import CenterBoardComponent from "./centerBoard";
import InsertData from "./insertData";
import DetailBoard from "./detailBoard";

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <div>
        <div id="header">
          <div id="header-area">
            <HeaderComponent />
          </div>
        </div>
        <div id="body">
          <div id="body-area">
            <div id="side-left">
              <SideLeftComponent />
            </div>
            <div id="center">
              {location.pathname !== "/insertData" && <CenterBoardComponent />}
              <div id="last-content">
                <Routes>
                  <Route
                    exact={true}
                    path="/"
                    element={<Navigate to="/myblog" replace />}
                  />
                  <Route
                    exact={true}
                    path="/myblog"
                    element={<DetailBoard />}
                  ></Route>
                  <Route
                    exact={true}
                    path="/insertData"
                    element={<InsertData />}
                  />
                </Routes>
              </div>
            </div>
            <div id="side-right">
              <SideRightComponent />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
