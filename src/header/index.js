import "./index.css";

function header() {
  return (
    <div id="home">
      <div id="Logo">
        <a href="/">
          <img id="header-logo" src="../images/MyBlog.JPG" alt="로고" />
        </a>
      </div>
      <div id="information">
        <a
          href="https://github.com/Crete666?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  );
}

export default header;
