import { useState, useRef,useEffect,useLayoutEffect } from "react";
import "./App.css";

// 自定义弹窗组件
const CustomModal = ({ isOpen, onClose, title, message, icon, onKeyDown }) => {
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }, 0);
    }
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div className="custom-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">{icon}</div>
        <div className="modal-title">{title}</div>
        <div className="modal-message">{message}</div>
        <button className="modal-button" onClick={onClose} onKeyDown={onKeyDown} ref={buttonRef}>
          确定
        </button>
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0); // 当前数字
  const [inputValue, setInputValue] = useState(""); // 输入框的值
  const [errMsg, setErrMsg] = useState(""); // 错误信息
  const [history, setHistory] = useState([]); // 历史记录
  const [modalData, setModalData] = useState({
    // 弹窗数据
    isOpen: false,
    title: "",
    message: "",
    icon: "",
  });

  // 显示弹窗
  const showModal = (title, message, icon) => {
    setModalData({
      isOpen: true,
      title,
      message,
      icon,
    });
    setInputValue("");
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalData({
      isOpen: false,
      title: "",
      message: "",
      icon: "",
    });
  };

  // 输入框的引用
  const textRef = useRef(null);

  // 输入框的焦点
  useEffect(() => {
    if (!modalData.isOpen && textRef.current) {
      textRef.current.focus();
    }
  }, [modalData.isOpen]);

  // 重置
  const handleReset = () => {
    setCount(0);
    setInputValue("");
  };

  // 确认
  const handleConfirm = () => {
    if (inputValue.trim() === "") {
      const errMessage = "输入内容不能为空";
      setErrMsg(errMessage);
      showModal("输入错误", errMessage, "⚠️");
    } else if (isNaN(Number(inputValue.trim()))) {
      const errMessage = "请输入数字";
      setErrMsg(errMessage);
      showModal("输入错误", errMessage, "❌");
    } else {
      const number = Number(inputValue.trim()); // 新输入的值
      setCount(number); // 设置新输入的值
      setHistory((prev) => {
        const updated = [...prev, number]; // prev 是旧的值，number 是新输入的值，因此 updated 是新的历史记录列表
        return updated;
      });
      setInputValue(""); // 清空输入框
      scrollToBottom();
    }
  };

  // 历史记录列表的引用
  const historyListRef = useRef(null);

  // 滚动到历史记录列表底部
  const scrollToBottom = () => {
    setTimeout(() => {
      if (historyListRef.current) {
        historyListRef.current.scrollTo({
          top: historyListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  // 清除历史记录
  const handleClearHistory = () => {
    setHistory([]);
  };

  // 增加
  const handleIncrease = (value) => {
    const newCount = count + value;
    setCount(newCount);
    setHistory((prev) => {
      const updated = [...prev, newCount];
      return updated;
    });
    scrollToBottom();
  };

  // 按下回车键确认
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleConfirm();
    }
  };
  
  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
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
            onKeyDown={handleKeyDown}
            ref={textRef}
          />
        </div>

        {/* 操作按钮区域 */}
        <div className="operation-buttons">
          <button
            className="operation-btn decrease"
            onClick={() => handleIncrease(-10)}
          >
            <span>-10</span>
          </button>
          <button
            className="operation-btn decrease"
            onClick={() => handleIncrease(-1)}
          >
            <span>-1</span>
          </button>
          <button
            className="operation-btn increase"
            onClick={() => handleIncrease(1)}
          >
            <span>+1</span>
          </button>
          <button
            className="operation-btn increase"
            onClick={() => handleIncrease(10)}
          >
            <span>+10</span>
          </button>
        </div>

        <div className="button-container">
          <div className="button-row">
            <button className="confirm-btn" onClick={handleConfirm}>
              <span>确认</span>
            </button>
            <button className="reset-btn" onClick={handleReset}>
              <span>重置</span>
            </button>
          </div>
          <div className="history-container">
            <div className="history-header">
              <p className="history-title">历史记录</p>
              <button className="confirm-btn" onClick={handleClearHistory}>
                清除数据
              </button>
            </div>
            {history.length === 0 ? (
              <div className="history-empty">暂无记录</div>
            ) : (
              <ul className="history-list" ref={historyListRef}>
                {history.map((item, index) => (
                  <li key={index} className="history-item">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        message={modalData.message}
        icon={modalData.icon}
        onKeyDown={handleKeyDown2}
      />
    </>
  );
}

export default App;
