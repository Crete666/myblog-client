import React, { forwardRef } from "react";
import "./index.css";
import axios from "axios";
import { API_URL } from "../config/constants.js";
import { useLocation } from "react-router-dom";
import Pagination from "../pagination";

const SideLeft = forwardRef((props, ref) => {
  const [projects, setProjects] = React.useState([]);
  const [totalItems, setTotalitems] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectPage = searchParams.get("PP");

  React.useEffect(() => {
    async function fetchProject() {
      await axios
        .get(`${API_URL}/projects`, {
          params: {
            page: projectPage,
          },
        })
        .then(function (result) {
          const projects = result.data.projects;
          setProjects(projects);
          setTotalitems(result.data.totalCount);
        })
        .catch(function (error) {
          console.error("에러 발생 : ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchProject();
  }, [projectPage]);

  if (isLoading) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <div id="sideLeft-project" ref={ref}>
      <h2>Project</h2>
      {projects.map(function (project, index) {
        return (
          <div className="project" key={index}>
            <div className="project-box">
              <a
                href={`${project.hubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
      <div id="project-paging-place">
        <Pagination
          totalItems={totalItems}
          currentPage={
            projectPage && parseInt(projectPage) > 0 ? parseInt(projectPage) : 1
          }
          pageCount={5}
          itemCountPerPage={5}
          pagingSpace={"project"}
        />
      </div>
    </div>
  );
});

export default SideLeft;
