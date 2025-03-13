import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
  pagingSpace,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const boardId = searchParams.get("id");
  const boardPage = searchParams.get("BP");
  const projectPage = searchParams.get("PP");
  const space = pagingSpace;

  const getUrl = (space, page) => {
    if (space === "board") {
      return `?id=${boardId}&BP=${page}&PP=${projectPage}`;
    } else {
      return `?id=${boardId}&BP=${boardPage}&PP=${page}`;
    }
  };

  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;
  useEffect(() => {
    console.log("space: ", space);
    console.log("currentPage: ", currentPage);
    console.log("start: ", start);
    console.log("totalPages: ", totalPages);
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className="wrapper">
      <ul className="pagination">
        <li className={`move ${noPrev ? "invisible" : ""}`}>
          <Link to={getUrl(space, start - 1)}>이전</Link>
        </li>
        {[...Array(pageCount)].map((_, i) => {
          const pageNumber = start + i;
          return (
            pageNumber <= totalPages && (
              <li key={pageNumber}>
                <Link
                  className={`page ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  to={getUrl(space, pageNumber)}
                >
                  {pageNumber}
                </Link>
              </li>
            )
          );
        })}
        <li className={`move ${noNext ? "invisible" : ""}`}>
          <Link to={getUrl(space, start + pageCount)}>다음</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
