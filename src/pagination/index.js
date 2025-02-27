import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Pagination({ totalItems, itemCountPerPage, pageCount, currentPage }) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;
  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className="wrapper">
      <ul className="pagination">
        <li className={`move ${noPrev ? "invisible" : ""}`}>
          <Link to={`?page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <>
            {start + i <= totalPages && (
              <li key={i}>
                <Link
                  className={`page ${
                    currentPage === start + i ? "active" : ""
                  }`}
                  to={`?page=${start + i}`}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </>
        ))}
        <li className={`move ${noNext ? "invisible" : ""}`}>
          <Link to={`?page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
