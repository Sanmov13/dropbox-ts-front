import React from "react";
import Header from "./components/Header/Header";
import MainPage from "./pages/Main/MainPage";
import NewsItem from "./pages/NewsItem/NewsItem";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/news/:id" element={<NewsItem />} />
        <Route path="/categories/:categoryId" element={<MainPage />} />
        <Route path="/categories/:categoryId/news/:id" element={<NewsItem />} />
      </Routes>
    </>
  );
};

export default App;
