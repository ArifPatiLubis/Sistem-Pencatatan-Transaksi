import React, {} from 'react';
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
