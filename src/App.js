import "./App.css";
import React, { Fragment } from "react";

import SideLeftComponent from "./sideLeft";
import SideRightComponent from "./sideRight";
import HeaderComponent from "./header";
import CenterBoardComponent from "./centerBoard";

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
              <div id="last-content"></div>
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
