import "./App.css";
import React from "react";

import NavbarVer2 from "./NavbarVer2";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import auth from './auth'

import L1Home from "./Pages/Sorting/L1Sorting/L1Home";
import L2Home from "./Pages/Sorting/L2Sorting/L2Home";
import L3Home from "./Pages/Sorting/L3Sorting/L3Home";
import L4Home from "./Pages/Sorting/L4Sorting/L4Home";

import Custom from "./Pages/Practice/Custom";
import Standard from "./Pages/Practice/Standard";
import LessonsHome from "./Pages/Lessons/LessonsHome";
import { ProtectedRoute } from "./ProtectedRoute";
import Analysis from './Analysis';

//Implement Control + C as a button bound.

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Login"component={Login}/>
          </Route>
          <ProtectedRoute path="/Home" component={Home} />
          <ProtectedRoute path="/Analysis" component={Analysis} />
          <Route path="/Login"component={Login}/>

          <Route path="/LessonsHome" component={LessonsHome} />

          <Route path="/L1Home" component={L1Home} />
          <Route path="/L2Home" component={L2Home} />
          <Route path="/L3Home" component={L3Home} />
          <Route path="/L4Home" component={L4Home} />

          <Route path="/CustomPractice" component={Custom} />
          <Route path="/StandardPractice" component={Standard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
{
  /*

  function closeTab(){
    window.close();
}
*/
}
{
  /*<button type="button" onClick={closeTab}>
        EXIT</button> */
}
