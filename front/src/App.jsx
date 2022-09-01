import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/HeaderloginSignup'
import LoginForm from './components/LoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header /><LoginForm />
      </div>
  )
}

export default App
