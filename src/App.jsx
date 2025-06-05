import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Counter from './pages/Counter'
import Weather from './pages/Weather'
import Chart from './pages/Chart'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='counter' element={<Counter />} />
        <Route path='chart' element={<Chart />} />
        <Route path='weather' element={<Weather />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
