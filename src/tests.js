import logo from './kermit.jpg';
import logo2 from './Trig.jpg';
import './App.css';
import React from 'react';


import NavbarVer2 from './NavbarVer2';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from "./Home.js"

import Template from "./Template"
//Implement Control + C as a button bound.


function tests() {



  return (

    <div className="tests">

  <BrowserRouter>
      <NavbarVer2/>
      <Switch>
   
  
                <Route path='/Level1' component={Level1} />
                <Route path='/LEVEL2' component={LEVEL2} />
                <Route path='/LEVEL3' component={LEVEL3} />
                <Route path='/LEVEL4' component={LEVEL4} />

      </Switch>

      
    </BrowserRouter>
    
      
    </div>
  );
}




export default tests;
