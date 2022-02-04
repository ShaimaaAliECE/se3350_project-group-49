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


function App() {



  return (

    <div className="App">

  <BrowserRouter>
      <NavbarVer2/>
      <Switch>
   
        <Route exact path="/">
                <Redirect to="/Home" />
                </Route>
                <Route path='/Home' component={Home} />

                <Route path='/Template' component={Template}/>

      </Switch>

      
    </BrowserRouter>
    
      
    </div>
  );
}




export default App;
{/*

  function closeTab(){
    window.close();
}
*/}
 {/*<button type="button" onClick={closeTab}>
        EXIT</button> */} 
