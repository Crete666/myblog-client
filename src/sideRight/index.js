import "./index.css";
function sideRight() {
  return (
    <div id="developer">
      <div id="image-box">
        <img src="../images/avatar.jpg" alt="증명사진" />
      </div>
      <div id="skill-box">
        <h2>Skills</h2>
        <div id="front">
          <b>Frontend</b>
          <div>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
            <li>React</li>
          </div>
        </div>
        <div id="back">
          <b>Backend</b>
          <li>Java</li>
          <li>NodeJS</li>
        </div>
        <div id="infra">
          <b>Infra</b>
          <li>AWS</li>
          <li>Kubernetes</li>
        </div>
      </div>
    </div>
  );
}

export default sideRight;
