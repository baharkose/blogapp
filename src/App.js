// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import BlogContextProvider from "./context/BlogContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <BlogContextProvider>
          <AppRouter />
        </BlogContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
