import { useState, useEffect } from 'react';
import './Settings.css';

function Settings() {
  // 设置项状态
  const [settings, setSettings] = useState({
    theme: 'dark',
    autoSave: true,
    soundEnabled: false,
    animationSpeed: 'normal',
    maxHistoryItems: 100,
    compactMode: false,
    showStatistics: true,
    exportFormat: 'json'
  });

  // 从localStorage加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('calculatorSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to load settings:', error);
      }
    }
  }, []);

  // 保存设置到localStorage
  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('calculatorSettings', JSON.stringify(newSettings));
  };

  // 处理设置项变更
  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  // 重置所有设置
  const resetSettings = () => {
    const defaultSettings = {
      theme: 'dark',
      autoSave: true,
      soundEnabled: false,
      animationSpeed: 'normal',
      maxHistoryItems: 100,
      compactMode: false,
      showStatistics: true,
      exportFormat: 'json'
    };
    saveSettings(defaultSettings);
  };

  // 清除所有数据
  const clearAllData = () => {
    if (window.confirm('确定要清除所有数据吗？这将删除历史记录、当前数字和所有设置，且无法恢复！')) {
      localStorage.removeItem('numberHistory');
      localStorage.removeItem('number');
      localStorage.removeItem('calculatorSettings');
      window.location.reload();
    }
  };

  const settingSections = [
    {
      title: '外观设置',
      icon: '🎨',
      items: [
        {
          id: 'theme',
          label: '主题模式',
          type: 'select',
          value: settings.theme,
          options: [
            { value: 'dark', label: '深色模式' },
            { value: 'light', label: '浅色模式' },
            { value: 'auto', label: '跟随系统' }
          ]
        },
        {
          id: 'animationSpeed',
          label: '动画速度',
          type: 'select',
          value: settings.animationSpeed,
          options: [
            { value: 'slow', label: '慢速' },
            { value: 'normal', label: '正常' },
            { value: 'fast', label: '快速' },
            { value: 'none', label: '无动画' }
          ]
        },
        {
          id: 'compactMode',
          label: '紧凑模式',
          type: 'toggle',
          value: settings.compactMode,
          description: '使用更紧凑的界面布局'
        }
      ]
    },
    {
      title: '功能设置',
      icon: '⚙️',
      items: [
        {
          id: 'autoSave',
          label: '自动保存',
          type: 'toggle',
          value: settings.autoSave,
          description: '自动保存计算历史到本地存储'
        },
        {
          id: 'soundEnabled',
          label: '音效提示',
          type: 'toggle',
          value: settings.soundEnabled,
          description: '操作时播放提示音效'
        },
        {
          id: 'showStatistics',
          label: '显示统计',
          type: 'toggle',
          value: settings.showStatistics,
          description: '在历史记录中显示统计信息'
        }
      ]
    },
    {
      title: '数据设置',
      icon: '💾',
      items: [
        {
          id: 'maxHistoryItems',
          label: '历史记录上限',
          type: 'number',
          value: settings.maxHistoryItems,
          min: 10,
          max: 1000,
          description: '最多保存的历史记录条数'
        },
        {
          id: 'exportFormat',
          label: '导出格式',
          type: 'select',
          value: settings.exportFormat,
          options: [
            { value: 'json', label: 'JSON格式' },
            { value: 'csv', label: 'CSV格式' },
            { value: 'txt', label: '纯文本' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="settings">
      <div className="settings__header">
        <h1 className="settings__title">
          <span className="settings__title-icon">⚙️</span>
          应用设置
        </h1>
        <p className="settings__subtitle">
          个性化您的计算器体验
        </p>
      </div>

      <div className="settings__content">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="settings-section">
            <div className="section-header">
              <span className="section-icon">{section.icon}</span>
              <h2 className="section-title">{section.title}</h2>
            </div>

            <div className="settings-grid">
              {section.items.map((item) => (
                <div key={item.id} className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">{item.label}</label>
                    {item.description && (
                      <p className="setting-description">{item.description}</p>
                    )}
                  </div>

                  <div className="setting-control">
                    {item.type === 'toggle' && (
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={(e) => handleSettingChange(item.id, e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    )}

                    {item.type === 'select' && (
                      <select
                        className="setting-select"
                        value={item.value}
                        onChange={(e) => handleSettingChange(item.id, e.target.value)}
                      >
                        {item.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {item.type === 'number' && (
                      <input
                        type="number"
                        className="setting-number"
                        value={item.value}
                        min={item.min}
                        max={item.max}
                        onChange={(e) => handleSettingChange(item.id, parseInt(e.target.value))}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 操作按钮区域 */}
        <div className="settings-actions">
          <div className="action-group">
            <h3 className="action-title">
              <span className="action-icon">🔧</span>
              操作选项
            </h3>
            
            <div className="action-buttons">
              <button 
                className="action-btn action-btn--warning"
                onClick={resetSettings}
              >
                <span className="btn-icon">🔄</span>
                重置设置
              </button>
              
              <button 
                className="action-btn action-btn--danger"
                onClick={clearAllData}
              >
                <span className="btn-icon">🗑️</span>
                清除所有数据
              </button>
            </div>
          </div>
        </div>

        {/* 应用信息 */}
        <div className="settings-info">
          <h3 className="info-title">
            <span className="info-icon">ℹ️</span>
            应用信息
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">版本</span>
              <span className="info-value">2.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">更新时间</span>
              <span className="info-value">2025-06-16</span>
            </div>
            <div className="info-item">
              <span className="info-label">数据存储</span>
              <span className="info-value">本地存储</span>
            </div>
            <div className="info-item">
              <span className="info-label">技术栈</span>
              <span className="info-value">React + Vite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;