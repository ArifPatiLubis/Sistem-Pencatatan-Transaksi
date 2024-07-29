import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/authContext/index";
import AppRoutes from './routes';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full h-screen flex">
          <div className="flex-grow">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;