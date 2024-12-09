import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../login/Login";
import Search from "../search/Search";
import FileNotFound from "../file-not-found/FileNotFound";
import Header from "../header/Header";
import Book from "../book/Book";
import Bookshelf from "../bookshelf/Bookshelf";

function Router() {
  return (
    <Routes>
      {/* The ProtectedRoute will redirect the user to the login form if they haven't logged in. */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookshelf"
        element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book/:id"
        element={
          <ProtectedRoute>
            <Book />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      {/* If no matches, display a 404 File Not Found page if logged in. If not logged in, the <ProtectedRoute /> will redirect to the login form. */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <FileNotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;
