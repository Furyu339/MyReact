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
        <p>
          数字是 {count}
        </p>
        <input type="number" value={inputValue} onChange={updateInputValue} />
      </div>
      <button onClick={handleAdd}>
        确认
      </button>
    </>
  )
}

export default App
