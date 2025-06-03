import { useState } from "react";
import "./App.css";

// 自定义弹窗组件
const CustomModal = ({ isOpen, onClose, title, message, icon }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">{icon}</div>
        <div className="modal-title">{title}</div>
        <div className="modal-message">{message}</div>
        <button className="modal-button" onClick={onClose}>
          确定
        </button>
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    message: "",
    icon: ""
  });

  const showModal = (title, message, icon) => {
    setModalData({
      isOpen: true,
      title,
      message,
      icon
    });
  };

  const closeModal = () => {
    setModalData({
      isOpen: false,
      title: "",
      message: "",
      icon: ""
    });
  };

  const handleReset = () => {
    setCount(0);
    setInputValue("");
  };

  const handleConfirm = () => {
    if (inputValue === "") {
      const errMessage = "输入内容不能为空";
      setErrMsg(errMessage);
      showModal("输入错误", errMessage, "⚠️");
    } else if (isNaN(Number(inputValue))) {
      const errMessage = "请输入数字";
      setErrMsg(errMessage);
      showModal("输入错误", errMessage, "❌");
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
      
      <CustomModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        message={modalData.message}
        icon={modalData.icon}
      />
    </>
  );
}

export default App;
