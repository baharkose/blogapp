import React from 'react';
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
        
            <AppRouter />
       
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
