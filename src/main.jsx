import React from "react";
import ReactDOM from "react-dom/client";
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import App from './App'
import "./index.scss";
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
