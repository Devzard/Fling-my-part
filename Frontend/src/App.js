import React from "react";
import "./App.css";
import DG_home from "./Components/Debashish/DG_home";
import DG_feed from "./Components/Debashish/DG_feed";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Loader from "./Components/Loader";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <DG_home />
          </Route>
          <Route path="/feed">
            <DG_feed />
          </Route>
        </Switch>
      </Router>
      {/* <Loader /> */}
    </div>
  );
}

export default App;
