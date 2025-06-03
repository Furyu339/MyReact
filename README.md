# MyReact - 数字计数器应用

一个基于 React + Vite 构建的简单数字计数器应用，支持用户输入数字并进行累加操作。

## 🚀 功能特性

- ✨ 简洁直观的用户界面
- 🔢 数字输入和累加功能
- ⚡ 基于 Vite 的快速开发体验
- 🎯 React 19 最新版本
- 📱 响应式设计
- 🔧 ESLint 代码规范检查

## 🛠️ 技术栈

- **前端框架**: React 19.1.0
- **构建工具**: Vite 6.3.5
- **开发语言**: JavaScript (ES6+)
- **代码规范**: ESLint
- **包管理器**: pnpm

## 📦 安装

### 前置要求

- Node.js >= 16.0.0
- pnpm (推荐) 或 npm

### 克隆项目

```bash
git clone https://github.com/Furyu339/MyReact.git
cd MyReact
```

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

## 🚀 运行项目

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 或使用 npm
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 构建生产版本

```bash
# 构建项目
pnpm build

# 或使用 npm
npm run build
```

### 预览生产版本

```bash
# 预览构建结果
pnpm preview

# 或使用 npm
npm run preview
```

### 代码检查

```bash
# 运行 ESLint 检查
pnpm lint

# 或使用 npm
npm run lint
```

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

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

- **Furyu339** - [GitHub](https://github.com/Furyu339)

## 🙏 致谢

- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [ESLint](https://eslint.org/) - JavaScript 代码检查工具

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
