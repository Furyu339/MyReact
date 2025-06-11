import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";

const HISTORY_STORAGE_KEY = "numberHistory";
const NUMBER_STORAGE_KEY = "number";

// 从 localStorage 读取历史记录
const getHistoryFromStorage = () => {
  const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 保存历史记录到 localStorage
const setHistoryToStorage = (history) => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
};

const getNumberFromStorage = () => {
  const stored = localStorage.getItem(NUMBER_STORAGE_KEY);
  return stored ? JSON.parse(stored) : 0;
};

const setNumberToStorage = (number) => {
  localStorage.setItem(NUMBER_STORAGE_KEY, JSON.stringify(number));
};

// 现代化模态框组件
const ConfirmModal = ({ isOpen, onClose, title, message, icon, onKeyDown }) => {
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
    <div className="modal" onClick={onClose}>
      <div className="modal__backdrop"></div>
      <div className="modal__content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__body">
          <div className={`confirm-icon confirm-icon--${icon === '⚠️' ? 'warning' : icon === '❌' ? 'danger' : 'info'}`}>
            {icon}
          </div>
          <div className="confirm-title">{title}</div>
          <div className="confirm-message">{message}</div>
        </div>
        <div className="modal__footer">
          <button 
            className="btn btn--primary modal__button" 
            onClick={onClose} 
            onKeyDown={onKeyDown} 
            ref={buttonRef}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(() => getNumberFromStorage());
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [history, setHistory] = useState(() => getHistoryFromStorage());
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    message: "",
    icon: "",
  });

  // 显示模态框
  const showModal = (title, message, icon) => {
    setModalData({
      isOpen: true,
      title,
      message,
      icon,
    });
    setInputValue("");
  };

  // 关闭模态框
  const closeModal = () => {
    setModalData({
      isOpen: false,
      title: "",
      message: "",
      icon: "",
    });
  };

  const textRef = useRef(null);
  const historyListRef = useRef(null);

  // 输入框焦点管理
  useEffect(() => {
    if (!modalData.isOpen && textRef.current) {
      textRef.current.focus();
    }
  }, [modalData.isOpen]);

  useEffect(() => {
    setHistoryToStorage(history);
    if (history.length > 0) {
      scrollToBottom();
    }
  }, [history]);

  useEffect(() => {
    setNumberToStorage(count);
  }, [count]);

  // 重置功能
  const handleReset = () => {
    setCount(0);
    setInputValue("");
    setHistory([]);
  };

  // 确认输入
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
      const number = Number(inputValue.trim());
      setCount(number);
      setHistory((prev) => {
        const updated = [...prev, number];
        return updated;
      });
      setInputValue("");
    }
  };

  // 滚动到历史记录底部
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

  // 数字增减操作
  const handleIncrease = (value) => {
    const newCount = count + value;
    setCount(newCount);
    setHistory((prev) => {
      const updated = [...prev, newCount];
      return updated;
    });
  };

  // 键盘事件处理
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
    <div className="app">
      <div className="app__container">
        {/* 标题区域 */}
        <header className="app__header">
          <h1 className="app__title">数字计算器</h1>
          <p className="app__subtitle">现代化、简约的数字操作工具</p>
        </header>

        {/* 数字显示卡片 */}
        <div className="number-card">
          <div className="number-label">当前数字</div>
          <div className="number-display">{count}</div>
        </div>

        {/* 输入区域 */}
        <section className="app__input-section">
          <div className="input-group">
            <input
              className="number-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入数字..."
              onKeyDown={handleKeyDown}
              ref={textRef}
            />
          </div>
        </section>

        {/* 操作按钮区域 */}
        <section className="app__operations">
          <div className="operations-group">
            <button
              className="operation-btn operation-btn--decrease"
              onClick={() => handleIncrease(-10)}
            >
              - 10
            </button>
            <button
              className="operation-btn operation-btn--decrease"
              onClick={() => handleIncrease(-1)}
            >
              - 1
            </button>
            <button
              className="operation-btn operation-btn--increase"
              onClick={() => handleIncrease(1)}
            >
              + 1
            </button>
            <button
              className="operation-btn operation-btn--increase"
              onClick={() => handleIncrease(10)}
            >
              + 10
            </button>
          </div>

          <div className="operations-actions">
            <button className="btn btn--primary btn--lg" onClick={handleConfirm}>
              确认
            </button>
            <button className="btn btn--danger btn--lg" onClick={handleReset}>
              重置
            </button>
          </div>
        </section>

        {/* 历史记录区域 */}
        <section className="app__history">
          <div className="history-card">
            <div className="history-header">
              <h3 className="history-title">历史记录</h3>
              <div className="history-controls">
                <button className="history-btn history-btn--export">
                  导出
                </button>
                <button className="history-btn history-btn--import">
                  导入
                </button>
                <button className="btn btn--primary btn--sm" onClick={handleClearHistory}>
                  清除
                </button>
              </div>
            </div>

            <div className="history-list" ref={historyListRef}>
              {history.length === 0 ? (
                <div className="history-empty">暂无历史记录</div>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="history-item">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 模态框 */}
      <ConfirmModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        message={modalData.message}
        icon={modalData.icon}
        onKeyDown={handleKeyDown2}
      />
    </div>
  );
}

export default App;
