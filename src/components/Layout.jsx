import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <Navigation />
      <main className="layout__main">
        <div className="layout__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;