import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleReset = () => {
    setCount(0);
    setInputValue("");
  };

  const handleConfirm = () => {
    if (inputValue === "") {
      const errMessage = "输入内容不能为空";
      setErrMsg(errMessage);
      alert(errMessage);
    } else if (isNaN(Number(inputValue))) {
      const errMessage = "请输入数字";
      setErrMsg(errMessage);
      alert(errMessage);
    } else {
      setCount(Number(inputValue));
    }
  };
  return (
    <>
      <div className="decoration"></div>
      <div className="decoration"></div>
      <div className="decoration"></div>
      <div className="app-container">
        <div className="card">
          <p>现在数字为 {count}</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入数字..."
          />
        </div>
        <div className="button-container">
          <button className="confirm-btn" onClick={handleConfirm}>
            <span>确认</span>
          </button>
          <button className="reset-btn" onClick={handleReset}>
            <span>删除</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
