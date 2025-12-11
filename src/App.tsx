import { useState } from 'react'
import './App.css'
import QuizApp from './pages/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <QuizApp />
  )
}

export default App
