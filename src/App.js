import React from "react";
import "./App.css";
import LoginLanding from "./pages/LoginLanding";
import HomeLanding from "./pages/HomeLanding";
import BooksListPage from "./pages/BooksListPage";
import BookDetailPage from "./pages/BookDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddonCart from "./pages/AddonCart";

const App = () => {
  return (
    <div className="app_Container">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={ LoginLanding } />
          <Route path="/home" Component={HomeLanding } />
          <Route path="/BooksListPage" Component={BooksListPage } />
          <Route path="/BookDetailPage/:bookId" Component={BookDetailPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
