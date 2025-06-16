import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '计算器', icon: '🧮' },
    { path: '/about', label: '关于', icon: 'ℹ️' },
    { path: '/settings', label: '设置', icon: '⚙️' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="nav-brand__icon">🔢</span>
        <span className="nav-brand__text">数字工具</span>
      </div>
      
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'nav-link--active' : ''}`}
            >
              <span className="nav-link__icon">{item.icon}</span>
              <span className="nav-link__text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;