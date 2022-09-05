import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NewPostPage from "./pages/NewPostPage";
import PostPage from "./pages/postPage";
import PostsPage from "./pages/PostsPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/newPost" element={<NewPostPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/myposts" element={<PostsPage />} />
        <Route path="/settings" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
