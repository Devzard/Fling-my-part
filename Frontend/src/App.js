import React from "react";
import "./App.css";
import Home from "./components/Debashish/Home";
import Feed from "./components/Debashish/Feed";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
        </Switch>
      </Router>
      {/* <Loader /> */}
    </div>
  );
}

export default App;
