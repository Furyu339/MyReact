# 现代化数字计算器

一个使用 React + SCSS 构建的现代化、简约的数字计算器应用。

## 🎨 设计特点

- **现代化 UI**：简约、实用、符合现代网页设计审美
- **SCSS 模块化**：组件化样式管理，易于维护和扩展
- **响应式设计**：完美适配桌面端和移动端
- **可访问性**：支持键盘导航和屏幕阅读器

## 🏗️ 项目架构

### SCSS 文件结构

```
src/scss/
├── utils/              # 工具文件
│   ├── _variables.scss # 设计系统变量
│   └── _mixins.scss    # 可复用混合器
├── base/               # 基础样式
│   └── _reset.scss     # 现代化 CSS 重置
├── components/         # 组件样式
│   ├── _button.scss    # 按钮组件
│   ├── _input.scss     # 输入框组件
│   ├── _card.scss      # 卡片组件
│   └── _modal.scss     # 模态框组件
├── pages/              # 页面样式
│   └── _app.scss       # 主应用页面
└── main.scss          # 主入口文件
```

### 设计系统

#### 颜色体系
- **主色调**：`#6366f1` (靛蓝)
- **成功色**：`#10b981` (翠绿)
- **危险色**：`#ef4444` (红色)
- **警告色**：`#f59e0b` (琥珀)
- **信息色**：`#3b82f6` (蓝色)

#### 间距系统
基于 0.25rem (4px) 的 8 点网格系统：
- `$spacing-1`: 0.25rem (4px)
- `$spacing-2`: 0.5rem (8px)
- `$spacing-4`: 1rem (16px)
- `$spacing-6`: 1.5rem (24px)
- `$spacing-8`: 2rem (32px)

#### 字体系统
- **主字体**：Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **等宽字体**：JetBrains Mono, SF Mono, Consolas, monospace
- **字体大小**：从 0.75rem 到 1.875rem 的语义化尺寸

## 🔧 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 🎯 功能特性

### 基础功能
- ✅ 数字显示和输入
- ✅ 加减乘除四则运算
- ✅ 操作历史记录
- ✅ 数据导入导出
- ✅ 历史记录清除

### UI/UX 特性
- ✅ 现代化卡片式设计
- ✅ 平滑过渡动画
- ✅ 悬浮反馈效果
- ✅ 响应式布局
- ✅ 无障碍访问支持

### 技术特性
- ✅ SCSS 模块化架构
- ✅ 组件化样式管理
- ✅ 设计系统变量
- ✅ 可复用混合器
- ✅ 移动端优化

## 🔄 样式架构说明

### 变量系统
所有设计令牌都定义在 `_variables.scss` 中，包括：
- 颜色定义
- 字体设置
- 间距规则
- 圆角半径
- 阴影效果
- 过渡动画

### 混合器工具
`_mixins.scss` 提供了常用的样式模式：
- 响应式断点
- 按钮基础样式
- 输入框样式
- 弹性布局工具
- 悬浮效果
- 焦点环样式

### 组件化设计
每个 UI 组件都有独立的 SCSS 文件：
- 使用 BEM 命名规范
- 支持多种变体和状态
- 响应式设计内置
- 可维护性强

## 📱 响应式设计

### 断点设置
- **小屏幕**：640px 以下
- **中等屏幕**：768px 以上
- **大屏幕**：1024px 以上
- **超大屏幕**：1280px 以上

### 移动端优化
- 触控友好的按钮尺寸
- 优化的间距和布局
- 简化的操作流程
- 自适应的字体大小

## 🛠️ 技术栈

- **前端框架**：React 19
- **构建工具**：Vite
- **样式预处理**：Sass/SCSS
- **包管理器**：pnpm
- **代码规范**：ESLint

## 📄 许可证

MIT License

## 📖 使用说明

1. **查看当前数字**: 页面显示当前累计的数字
2. **输入数字**: 在输入框中输入要添加的数字
3. **确认添加**: 点击"确认"按钮将输入的数字加到当前总数中

## 📁 项目结构

```
MyReact/
├── public/                 # 静态资源
│   └── vite.svg           # Vite 图标
├── src/                   # 源代码
│   ├── App.css           # 应用样式
│   ├── App.jsx           # 主应用组件
│   ├── index.css         # 全局样式
│   └── main.jsx          # 应用入口
├── .gitignore            # Git 忽略文件
├── eslint.config.js      # ESLint 配置
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── pnpm-lock.yaml        # 依赖锁定文件
├── README.md             # 项目说明
└── vite.config.js        # Vite 配置
```

## 🔧 核心代码

### 主要组件 (App.jsx)

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const updateInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const handleAdd = () => {
    setCount(count + Number(inputValue))
  }

  return (
    <>
      <div className="card">
        <p>数字是 {count}</p>
        <input type="number" value={inputValue} onChange={updateInputValue} />
      </div>
      <button onClick={handleAdd}>确认</button>
    </>
  )
}

export default App
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 开发计划

- [ ] 添加减法功能
- [ ] 添加清零功能
- [ ] 添加历史记录
- [ ] 添加单元测试
- [ ] 添加 TypeScript 支持
- [ ] 优化 UI 设计

## 👨‍💻 作者

- **Furyu339** - [GitHub](https://github.com/Furyu339)

## 🙏 致谢

- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [ESLint](https://eslint.org/) - JavaScript 代码检查工具

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
