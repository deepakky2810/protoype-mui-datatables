import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Proto1 from "./Proto1";
import Proto2 from "./Proto2";
import Proto3 from "./Proto3";
import Proto4 from "./Proto4";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/prototype1" element={<Proto1 />} />
        <Route path="/prototype2" element={<Proto2 />} />
        <Route path="/prototype3" element={<Proto3 />} />
        <Route path="/prototype4" element={<Proto4 />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
