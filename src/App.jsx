import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dummy from './Compo/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Dummy/>
    </>
  )
}

export default App
