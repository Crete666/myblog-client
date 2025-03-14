import "./App.css";
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SideLeftComponent from "./sideLeft";
import SideRightComponent from "./sideRight";
import HeaderComponent from "./header";
import CenterBoardComponent from "./centerBoard";
import InsertData from "./insertData";
import DetailBoard from "./detailBoard";

function App() {
  const location = useLocation();
  const sideLeftRef = useRef(null);
  const [isSideLeftRendered, setIsSideLeftRendered] = useState(false);

  useEffect(() => {
    const checkRendering = setInterval(() => {
      if (sideLeftRef.current) {
        setIsSideLeftRendered(true);
        clearInterval(checkRendering); // 체크 완료 후 인터벌 제거
      }
    }, 50); // 50ms 간격으로 확인

    return () => clearInterval(checkRendering); // 언마운트 시 정리
  }, []);

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
              <SideLeftComponent ref={sideLeftRef} />
            </div>
            {isSideLeftRendered ? (
              <div id="center">
                {location.pathname !== "/insertData" && (
                  <CenterBoardComponent />
                )}
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
            ) : (
              <h1>로딩 중...</h1>
            )}
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
