import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Calculator from './components/Calculator';
import About from './pages/About';
import Settings from './pages/Settings';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Calculator />} />
              <Route path="about" element={<About />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
