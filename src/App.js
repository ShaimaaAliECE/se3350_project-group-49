import logo from './kermit.jpg';
import logo2 from './Trig.jpg';
import './App.css';
import React from 'react';


import NavbarVer2 from './NavbarVer2';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from "./Home.js"
import Lessons from './Lessons';
import Practice from './Practice'
import Level1 from './Pages/Testing Pages/Level1';
import Level2 from './Pages/Testing Pages/Level2';
import Level3 from './Pages/Testing Pages/Level3';
import Level4 from './Pages/Testing Pages/Level4';

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
                <Route path='/Lessons' component={Lessons} />
                <Route path='/Practice' component={Practice} />
                <Route path='/Level1' component={Level1}/>
                <Route path='/Level2' component={Level2}/>
                <Route path='/Level3' component={Level3}/>
                <Route path='/Level4' component={Level4}/>
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
