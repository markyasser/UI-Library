import React from "react";
import Routes from "./routes";
import "./assets/styles/App.css";
import NavBar from "./sections/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./sections/footer";

const App = () => (
  <div className="App">
    <Router>
      <NavBar />
      <div className="content">
        <Routes />
        <Footer />
      </div>
    </Router>
  </div>
);

export default App;
