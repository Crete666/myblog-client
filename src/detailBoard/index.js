import "./index.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

import styled from "styled-components";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

// 변환시켜준 editorState 값을 넣기 위한 div 태그 css
const IntroduceContent = styled.div`
  width: 100%;
  margin-top: 4px;
`;

function DetailBoard() {
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let boardPage = searchParams.get("BP");
  let projectPage = searchParams.get("PP");

  const [board, setBoard] = useState(null);
  const navigate = useNavigate();

  function contentData(contents) {
    console.log("draftToHtml");
    console.log(draftToHtml(htmlToDraft(contents)));
    return draftToHtml(htmlToDraft(contents));
  }

  const getBoard = () => {
    axios
      .get(`${API_URL}/boards/${id}`)
      .then((result) => {
        setBoard(result.data.board);
        console.log(result.data.board);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBoardRecently = async () => {
    await axios
      .get(`${API_URL}/boardRecently`)
      .then((result) => {
        id = result.data.id;
        setBoard(result.data.board);
        contentData = board.contents;
        if (!boardPage && !projectPage) {
          navigate(`/myblog?id=${id}&BP=1&PP=1`, { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(function () {
    if (!id && !boardPage && !projectPage) {
      getBoardRecently();
    } else {
      getBoard();
    }
  }, []);

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
