import "./index.css";
import { API_URL } from "../config/constants.js";
import { Form, Input, Button } from "antd";
import axios from "axios";

function InsertData() {
  const onSubmitBoatd = (values) => {
    axios
      .post(`http://localhost:8080/insertBoard`, {
        title: values.title,
        contents: values.contents,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div id="insert-board">
        <b>게시글 작성하기</b>
        <Form name="게시글 업로드" onFinish={onSubmitBoatd}>
          <Form.Item
            name="title"
            label={<div className="upload-label">제목</div>}
            rules={[{ required: true, message: "제목을 입력하세요." }]}
          >
            <Input className="upload-title" size="large" placeholder="제목" />
          </Form.Item>
          <Form.Item
            name="contents"
            label={<div className="upload-label">내용</div>}
            rules={[{ required: true, message: "내용을 입력하세요." }]}
          >
            <Input.TextArea
              id="upload-contents"
              size="large"
              placeholder="내용을 입력하세요."
              maxLength={300}
            />
          </Form.Item>
          <Form.Item>
            <Button className="submit-data" size="large" htmlType="submit">
              게시글 등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default InsertData;
