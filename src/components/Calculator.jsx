import { useState, useRef, useEffect, useLayoutEffect } from "react";

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
      <div
        className="modal__content confirm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__body">
          <div
            className={`confirm-icon confirm-icon--${icon === "⚠️" ? "warning" : icon === "❌" ? "danger" : "info"
              }`}
          >
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

function Calculator() {
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
    setInputValue("");
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

  // 导出功能：将历史记录保存为JSON文件（优化版）
  const handleExport = () => {
    try {
      // 1. 检查是否有数据可以导出
      if (history.length === 0) {
        showModal("导出失败", "没有历史记录可以导出", "❌");
        return;
      }

      // 2. 生成更友好的时间戳文件名
      const now = new Date();
      const timeString = now.toISOString().slice(0, 19).replace(/:/g, '-');
      const fileName = `数字计算器历史记录_${timeString}.json`;

      // 3. 准备要导出的数据对象（增加更多元数据）
      const exportData = {
        version: "1.0",                      // 数据格式版本
        appName: "数字计算器",               // 应用名称
        exportTime: now.toISOString(),       // 导出时间
        exportTimestamp: now.getTime(),      // 时间戳
        currentNumber: count,                // 当前显示的数字
        history: history,                    // 完整的历史记录数组
        totalRecords: history.length,        // 记录总数
        statistics: {                        // 统计信息
          min: Math.min(...history),
          max: Math.max(...history),
          sum: history.reduce((a, b) => a + b, 0),
          average: history.length > 0 ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(2) : 0
        }
      };

      // 4. 将JavaScript对象转换为格式化的JSON字符串
      const jsonString = JSON.stringify(exportData, null, 2);

      // 5. 创建Blob对象（添加UTF-8 BOM以确保中文正确显示）
      const blob = new Blob(['\ufeff' + jsonString], { 
        type: "application/json;charset=utf-8" 
      });

      // 6. 使用现代浏览器API进行下载
      if (window.showSaveFilePicker) {
        // 使用新的File System Access API（如果支持）
        downloadWithFileSystemAPI(blob, fileName);
      } else {
        // 回退到传统方法
        downloadWithTraditionalMethod(blob, fileName);
      }

      // 7. 显示成功提示
      showModal("导出成功", `已导出 ${history.length} 条历史记录到文件 ${fileName}`, "✅");

    } catch (error) {
      console.error('导出失败:', error);
      showModal("导出失败", "导出过程中发生错误，请重试", "❌");
    }
  };

  // 传统下载方法
  const downloadWithTraditionalMethod = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // 延迟清理URL，确保下载完成
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  // 现代文件系统API下载方法
  const downloadWithFileSystemAPI = async (blob, fileName) => {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: 'JSON files',
          accept: { 'application/json': ['.json'] }
        }]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      // 用户取消或不支持，回退到传统方法
      downloadWithTraditionalMethod(blob, fileName);
    }
  };

  // 导入功能：从JSON文件恢复历史记录（优化版）
  const handleImport = () => {
    // 1. 创建一个隐藏的文件输入框
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json,application/json";  // 更精确的文件类型限制
    fileInput.multiple = false;

    // 2. 设置文件选择后的处理函数
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      
      if (!file) return;

      // 3. 文件大小检查（限制为5MB）
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        showModal("导入失败", "文件过大，请选择小于5MB的文件", "❌");
        return;
      }

      // 4. 文件类型检查
      if (!file.type.includes('json') && !file.name.toLowerCase().endsWith('.json')) {
        showModal("导入失败", "请选择JSON格式的文件", "❌");
        return;
      }

      try {
        // 5. 使用现代Promise方式读取文件
        const content = await readFileAsText(file);
        
        // 6. 解析和验证数据
        const result = validateAndParseImportData(content);
        
        if (result.success) {
          // 7. 数据导入前的确认
          const confirmMessage = `
            即将导入 ${result.data.history.length} 条历史记录
            ${result.data.currentNumber !== undefined ? `当前数字将设置为: ${result.data.currentNumber}` : ''}
            ${result.data.version ? `数据版本: ${result.data.version}` : ''}
            ${result.data.exportTime ? `导出时间: ${new Date(result.data.exportTime).toLocaleString()}` : ''}
            
            这将替换当前的所有历史记录，是否继续？
          `;
          
          // 简化版确认（实际项目中可以做成更好的确认对话框）
          if (window.confirm(confirmMessage)) {
            // 8. 执行数据导入
            performDataImport(result.data);
          }
        } else {
          showModal("导入失败", result.error, "❌");
        }
        
      } catch (error) {
        console.error('导入过程出错:', error);
        showModal("导入失败", "文件读取或解析过程中发生错误", "❌");
      }
    };
    
    // 9. 触发文件选择对话框
    fileInput.click();
  };

  // 使用Promise方式读取文件
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('文件读取失败'));
      reader.readAsText(file, 'utf-8');
    });
  };

  // 验证和解析导入数据
  const validateAndParseImportData = (content) => {
    try {
      // 1. 解析JSON
      const data = JSON.parse(content);
      
      // 2. 基本结构验证
      if (!data || typeof data !== 'object') {
        return { success: false, error: '文件内容格式不正确' };
      }

      // 3. 历史记录验证
      if (!data.history || !Array.isArray(data.history)) {
        return { success: false, error: '文件中缺少有效的历史记录数据' };
      }

      // 4. 历史记录内容验证
      const validHistory = data.history.filter(item => 
        typeof item === 'number' && !isNaN(item) && isFinite(item)
      );

      if (validHistory.length === 0) {
        return { success: false, error: '文件中没有有效的数字记录' };
      }

      if (validHistory.length !== data.history.length) {
        console.warn(`过滤了 ${data.history.length - validHistory.length} 个无效记录`);
      }

      // 5. 当前数字验证
      let currentNumber = 0;
      if (data.currentNumber !== undefined) {
        if (typeof data.currentNumber === 'number' && !isNaN(data.currentNumber)) {
          currentNumber = data.currentNumber;
        }
      }

      // 6. 版本兼容性检查
      if (data.version && data.version !== "1.0") {
        console.warn(`数据版本 ${data.version} 可能不完全兼容`);
      }

      return {
        success: true,
        data: {
          history: validHistory,
          currentNumber: currentNumber,
          version: data.version,
          exportTime: data.exportTime,
          appName: data.appName
        }
      };

    } catch (error) {
      return { 
        success: false, 
        error: `JSON解析失败: ${error.message}` 
      };
    }
  };

  // 执行数据导入
  const performDataImport = (data) => {
    try {
      // 1. 更新历史记录
      setHistory(data.history);
      
      // 2. 更新当前数字
      setCount(data.currentNumber);
      
      // 3. 显示成功消息
      const successMessage = `
        导入成功！
        • 历史记录: ${data.history.length} 条
        • 当前数字: ${data.currentNumber}
        ${data.exportTime ? `• 原导出时间: ${new Date(data.exportTime).toLocaleString()}` : ''}
      `;
      
      showModal("导入成功", successMessage, "✅");
      
    } catch (error) {
      console.error('数据导入失败:', error);
      showModal("导入失败", "数据导入过程中发生错误", "❌");
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
    <div className="calculator">
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
          <button
            className="btn btn--primary btn--lg"
            onClick={handleConfirm}
          >
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
              <button
                className="history-btn history-btn--export"
                onClick={handleExport}
              >
                导出
              </button>
              <button
                className="history-btn history-btn--import"
                onClick={handleImport}
              >
                导入
              </button>
              <button
                className="btn btn--primary btn--sm"
                onClick={handleClearHistory}
              >
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

export default Calculator;