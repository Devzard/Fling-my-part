import React from "react";
import "./App.css";

// DG
import DG_feed from "./Components/Debashish/DG_feed";
import DG_completePost from "./Components/Debashish/DG_completePost";
import DG_profile from "./Components/Debashish/DG_profile";

//RG

//RJD

//
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Link,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/flingazine"></Redirect>
          </Route>
          {/* feed routes  */}
          <Route path="/feed"></Route>
          {/* fligazine routes */}
          <Route exact path="/flingazine">
            <DG_feed />
          </Route>
          <Route path="/flingazine/post/:id">
            <DG_completePost />
          </Route>
          <Route path="/flingazine/:username">
            <DG_profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
