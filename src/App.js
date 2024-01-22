// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
