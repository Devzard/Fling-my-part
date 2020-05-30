import React from "react";
import "./App.css";

// DG
import DG_home from "./Components/Debashish/DG_home";
import DG_feed from "./Components/Debashish/DG_feed";
import DG_completePost from "./Components/Debashish/DG_completePost";
import DG_profile from "./Components/Debashish/DG_profile";

//RG

//RJD

//
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <DG_home />
          </Route>
          {/* fligazine routes */}
          <Route exact path="/flingazine">
            <DG_feed />
          </Route>
          <Route path="/feed/post/:id">
            <DG_completePost />
          </Route>
          <Route path="/feed/:username">
            <DG_profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
