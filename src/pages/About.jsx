import './About.css';

function About() {
  const features = [
    {
      icon: '🧮',
      title: '智能计算',
      description: '支持数字输入验证，实时计算结果显示'
    },
    {
      icon: '📈',
      title: '历史记录',
      description: '自动保存计算历史，支持查看和管理'
    },
    {
      icon: '💾',
      title: '数据持久化',
      description: '本地存储数据，刷新页面不丢失'
    },
    {
      icon: '📤',
      title: '导入导出',
      description: '支持JSON格式的数据导入和导出'
    },
    {
      icon: '🎨',
      title: '现代化UI',
      description: '炫酷的渐变效果和流畅的动画体验'
    },
    {
      icon: '📱',
      title: '响应式设计',
      description: '完美适配各种设备屏幕尺寸'
    }
  ];

  const stats = [
    { label: '开发语言', value: 'React 19' },
    { label: '构建工具', value: 'Vite' },
    { label: '样式方案', value: 'CSS + SASS' },
    { label: '路由管理', value: 'React Router' }
  ];

  return (
    <div className="about">
      <div className="about__hero">
        <h1 className="about__title">
          <span className="about__title-icon">🔢</span>
          数字计算器
        </h1>
        <p className="about__subtitle">
          现代化、功能完整的React数字计算工具
        </p>
        <div className="about__version">
          <span className="version-tag">v2.0.0</span>
        </div>
      </div>

      <section className="about__features">
        <h2 className="section-title">✨ 核心功能</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about__tech">
        <h2 className="section-title">🛠️ 技术栈</h2>
        <div className="tech-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about__info">
        <div className="info-card">
          <h2 className="section-title">📚 项目说明</h2>
          <div className="info-content">
            <p>
              这是一个基于React构建的现代化数字计算器应用，作为React学习项目的一部分。
              项目从简单的单页面应用开始，逐步演进为具备完整功能的多页面应用。
            </p>
            <p>
              通过这个项目，我们学习了React的核心概念，包括组件化开发、状态管理、
              事件处理、路由导航、数据持久化等重要技能。
            </p>
            <div className="learning-highlights">
              <h3>🎯 学习重点</h3>
              <ul>
                <li>React Hooks (useState, useEffect, useRef等)</li>
                <li>组件拆分与组合模式</li>
                <li>React Router路由管理</li>
                <li>LocalStorage数据持久化</li>
                <li>现代CSS样式与动画</li>
                <li>响应式设计最佳实践</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="about__footer">
        <p>
          Made with ❤️ using React & Modern Web Technologies
        </p>
        <p className="footer-note">
          持续学习，持续进步 🚀
        </p>
      </footer>
    </div>
  );
}

export default About;