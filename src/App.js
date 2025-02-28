import "./App.css";
import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SideLeftComponent from "./sideLeft";
import SideRightComponent from "./sideRight";
import HeaderComponent from "./header";
import CenterBoardComponent from "./centerBoard";
import InsertData from "./insertData";

function App() {
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
              <CenterBoardComponent />
              <div id="last-content">
                <Routes>
                  <Route
                    exact={true}
                    path="/"
                    render={() => <Navigate to="/myblog" />}
                  />
                  <Route exact={true} path="/myblog"></Route>
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
