import "./index.css";
import { API_URL } from "../config/constants.js";
import { Form, Input, Button, Divider, Upload, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InsertData() {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const onSubmitBoatd = (values) => {
    axios
      .post(`${API_URL}/insertBoard`, {
        title: values.title,
        contents: values.contents,
      })
      .then((result) => {
        console.log(result);
        navigate("/myblog");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onSubmitProject = (values) => {
    axios
      .post(`${API_URL}/insertProject`, {
        name: values.name,
        imageUrl: imageUrl,
        hubUrl: values.hubUrl,
      })
      .then((result) => {
        console.log(result);
        navigate("/myblog");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
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
        <Divider />
        <div id="insert-project">
          <b>Project 등록하기</b>
          <Form name="프로젝트 업로드" onFinish={onSubmitProject}>
            <Form.Item
              name="name"
              label={<div className="upload-label">프로젝트 명</div>}
              rules={[{ required: true, message: "프로젝트 명을 입력하세요." }]}
            >
              <Input
                className="upload-title"
                size="large"
                placeholder="프로젝트 명"
              />
            </Form.Item>
            <Form.Item
              name="project-img"
              label={<div className="upload-label">프로젝트 사진</div>}
              rules={[{ required: true, message: "사진을 등록하세요." }]}
            >
              <Upload
                name="image"
                action={`${API_URL}/image`}
                listType="picture"
                showUploadList={false}
                onChange={onChangeImage}
              >
                {imageUrl ? (
                  <img id="project-img" src={`${API_URL}/${imageUrl}`} />
                ) : (
                  <div id="upload-img-placeholder">
                    <img src="images/camera.png" />
                    <span>이미지를 업로드 해주세요.</span>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name="hubUrl"
              label={<div className="upload-label">Github 주소</div>}
              rules={[
                { required: true, message: "Github 주소를 입력해주세요." },
              ]}
            >
              <Input
                className="upload-contents"
                size="large"
                placeholder="Github 주소"
              />
            </Form.Item>
            <Form.Item>
              <Button className="submit-data" size="large" htmlType="submit">
                Project 등록하기
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default InsertData;
