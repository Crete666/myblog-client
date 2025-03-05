import React from "react";
import "./index.css";
import axios from "axios";
import { API_URL } from "../config/constants.js";

function SideLeft() {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/projects`)
      .then(function (result) {
        const projects = result.data.projects;
        setProjects(projects);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);
  return (
    <div>
      <h2>Project</h2>
      {projects.map(function (project, index) {
        return (
          <div className="project" key={index}>
            <div className="project-box">
              <a href={`${project.hubUrl}`} target="_blank">
                <img
                  className="project-image"
                  src={`${API_URL}/${project.imageUrl}`}
                  alt={`${project.name}`}
                />
              </a>
            </div>
            <div className="project-name">
              <b>{project.name}</b>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SideLeft;
