import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Proto1 from "./src/Proto1";
import Proto2 from "./src/Proto2";
import Proto3 from "./src/Proto3";
import Home from "./src/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/prototype1" element={<Proto1 />} />
        <Route path="/prototype2" element={<Proto2 />} />
        <Route path="/prototype3" element={<Proto3 />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
