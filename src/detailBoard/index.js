import "./index.css";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import styled from "styled-components";

// 변환시켜준 editorState 값을 넣기 위한 div 태그 css
const IntroduceContent = styled.div`
  width: 100%;
  margin-top: 4px;
`;

function DetailBoard() {
  const idRef = useRef(null);
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let boardPage = searchParams.get("BP");
  let projectPage = searchParams.get("PP");

  const [board, setBoard] = useState(null);
  const navigate = useNavigate();

  const getBoard = useCallback(async () => {
    await axios
      .get(`${API_URL}/boards/${idRef.current}`)
      .then((result) => {
        setBoard(result.data.board);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getBoardRecently = useCallback(async () => {
    await axios
      .get(`${API_URL}/boardRecently`)
      .then((result) => {
        idRef.current = result.data.id;
        setBoard(result.data.board);
        if (!boardPage && !projectPage) {
          navigate(`/myblog?id=${idRef.current}&BP=1&PP=1`, { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [boardPage, projectPage, navigate]);

  useEffect(() => {
    idRef.current = id;
    if (!id && !boardPage && !projectPage) {
      getBoardRecently();
    } else {
      getBoard();
    }
  }, [id, boardPage, projectPage, getBoard, getBoardRecently]);

  if (board == null) {
    return <h1>게시글 정보를 받아오고 있습니다.</h1>;
  }

  return (
    <div id="detail">
      <div id="detail-head">
        <div id="detail-title">{board.title}</div>
        <div id="detail-createAt">
          <span id="detail-createAt-text">
            {dayjs(board.createdAt).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
      <div id="detail-content">
        <IntroduceContent
          dangerouslySetInnerHTML={{ __html: board.contents }}
        />
      </div>
    </div>
  );
}

export default DetailBoard;
