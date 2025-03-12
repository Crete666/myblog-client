import "./index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API_URL } from "../config/constants.js";
import { Form, Input, Button, Divider, Upload, message } from "antd";
import axios from "axios";
import { useState } from "react";

import { Editor } from "react-draft-wysiwyg";
// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw } from "draft-js";
// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from "draftjs-to-html";

function InsertData() {
  const [imageUrl, setImageUrl] = useState(null);
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const uploadImageCallback = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_URL}/image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = `${API_URL}/${data.imageUrl}`;

      return { data: { link: imageUrl } }; // ✅ 반드시 URL 반환
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      return { data: { link: "" } }; // ✅ 에러 방지
    }
  };

  function getEditorContent(editorState) {
    return editorState
      ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
      : "";
  }

  const onSubmitBoatd = (values) => {
    console.log("onSubmitBoard 실행");
    const editorContent = getEditorContent(editorState);
    console.log("제출된 데이터 : ", values);
    console.log("editorContent : ", editorContent);

    axios
      .post(`${API_URL}/insertBoard`, {
        title: values.title,
        contents: editorContent,
      })
      .then((result) => {
        console.log(result);
        window.location.replace("/myblog");
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
        window.location.replace("/myblog");
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
        <span className="item-title">게시글 작성하기</span>
        <Form name="게시글 업로드" onFinish={onSubmitBoatd}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "제목을 입력하세요." }]}
          >
            <Input className="upload-title" size="large" placeholder="제목" />
          </Form.Item>
          <Form.Item
            name="contents"
            rules={[{ required: false, message: "내용을 입력하세요." }]}
          >
            <>
              <Editor
                // 에디터와 툴바 모두에 적용되는 클래스
                wrapperClassName="editor-wrapper-class"
                // 에디터 주변에 적용된 클래스
                editorClassName="editor"
                // 툴바 주위에 적용된 클래스
                toolbarClassName="editor-toolbar-class"
                // 툴바 설정
                toolbar={{
                  // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: false },
                  // image 크기 설정
                  image: {
                    previewImage: false,
                    defaultSize: { height: "auto", width: "100%" },
                    uploadCallback: uploadImageCallback,
                    alt: { present: true, mandatory: false }, // ✅ alt 속성 추가
                  },
                }}
                placeholder="내용을 작성해주세요."
                // 한국어 설정
                localization={{
                  locale: "ko",
                }}
                // 초기값 설정
                editorState={editorState}
                // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                onEditorStateChange={onEditorStateChange}
              />
            </>
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
