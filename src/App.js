// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import BlogContextProvider from "./context/BlogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthContextProvider>
            <BlogContextProvider>
              <AppRouter />
            </BlogContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
