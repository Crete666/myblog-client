import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import axios from "axios";
import dayjs from "dayjs";
import { API_URL } from "../config/constants.js";
import Pagination from "../pagination";

function CenterBoard() {
  const [boards, setBoards] = React.useState([]);
  const [totalItems, setTotalitems] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const boardPage = searchParams.get("BP");
  const projectPage = searchParams.get("PP");

  React.useEffect(() => {
    async function fetchBoard() {
      await axios
        .get(`${API_URL}/boards`, {
          params: {
            page: boardPage,
          },
        })
        .then(function (result) {
          const boards = result.data.board;
          setBoards(boards);
          setTotalitems(result.data.totalCount);
        })
        .catch(function (error) {
          console.error("에러 발생 : ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetchBoard();
  }, [boardPage]);

  if (isLoading) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <div id="blog-board">
      <div className="title-area">
        <div className="board-title">
          <span className="head-text">글제목</span>
        </div>
        <div className="board-createAt">
          <span className="head-text">작성일</span>
        </div>
      </div>

      {boards.map(function (board, index) {
        return (
          <div className="link-area" key={index}>
            <a
              href={`/myblog?id=${board.id}&BP=${boardPage}&PP=${projectPage}`}
            >
              <div className="center-board-row">
                <div className="board-title">{board.title}</div>
                <div className="board-createAt">
                  {dayjs(board.createdAt).format("YYYY-MM-DD")}
                </div>
              </div>
            </a>
          </div>
        );
      })}
      <div id="paging-place">
        <Pagination
          totalItems={totalItems}
          currentPage={
            boardPage && parseInt(boardPage) > 0 ? parseInt(boardPage) : 1
          }
          pageCount={5}
          itemCountPerPage={5}
          pagingSpace={"board"}
        />
      </div>
    </div>
  );
}

export default CenterBoard;
