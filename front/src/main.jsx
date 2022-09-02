import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import App from './App'
import './index.scss'
import './App.css'
import LoginPage from './pages/LoginPage'

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Route path="/login">
        <LoginPage/>
      </Route>
    </Router>
    <App />
  </React.StrictMode>
)
*/
/*
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
*/
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route index element={<LoginPage />} />
          
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);