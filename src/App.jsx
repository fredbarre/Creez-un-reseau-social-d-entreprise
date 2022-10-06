import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NewPostPage from "./pages/NewPostPage";
import PostPage from "./pages/postPage";
import PostsPage from "./pages/PostsPage";
import Header from "./components/Header";
import { UserContext } from "./contexts/UserContext";
import SettingsPage from "./pages/SettingsPage";
import NoPage from "./pages/NoPage";
import { UpdateProvider } from "./contexts/Update";
import CommentPage from "./pages/CommentPage";

function App() {
  const [user, setUser] = useState();
  const [account, setAccount] = useState();
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const [connected, setConnected] = useState();

  function IsGuest({ to }) {
    const To = to;
    if (connected) return <Navigate to="/posts" />;
    return <To />;
  }
  function IsAuth({ to }) {
    const To = to;
    if (!connected) return <Navigate to="/login" />;
    return <To />;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          setUser,
          account,
          setAccount,
          role,
          setRole,
          token,
          setToken,
          connected,
          setConnected,
        }}
      >
        <UpdateProvider>
          <Header />
          <Routes>
            <Route path="/" element={<IsAuth to={PostsPage} />} />
            <Route path="/login" element={<IsGuest to={LoginPage} />} />
            <Route path="/signup" element={<IsGuest to={SignupPage} />} />
            <Route path="/newPost" element={<IsAuth to={NewPostPage} />} />
            <Route path="/newPost/:id" element={<IsAuth to={NewPostPage} />} />
            <Route path="/post/:id" element={<IsAuth to={PostPage} />} />
            <Route path="/posts" element={<IsAuth to={PostsPage} />} />
            <Route path="/myposts" element={<IsAuth to={PostsPage} />} />
            <Route path="/settings" element={<IsAuth to={SettingsPage} />} />
            <Route path="/comment/:id" element={<IsAuth to={CommentPage} />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </UpdateProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
