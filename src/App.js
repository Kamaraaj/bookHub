import React from "react";
import "./App.css";
import LoginLanding from "./pages/LoginLanding";
import HomeLanding from "./pages/HomeLanding";
import BooksListPage from "./pages/BooksListPage";
import BookDetailPage from "./pages/BookDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div className="app_Container">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomeLanding />} />
            <Route path="/BooksListPage" element={<BooksListPage />} />
            <Route path="/BookDetailPage/:bookId" element={<BookDetailPage />} />
          </Route>
          <Route path="/login" element={<LoginLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
