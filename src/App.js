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
import L1sorting from './LevelOne';
import InsertionSort from './LevelOne';
import Lessons from './Lessons';
import Level1 from './Pages/Testing Pages/Level1';
import LevelOne from './LevelOne';
import Standard from './Standard';
import Custom from './Custom';
import LevelTwo from './LevelTwo';
import LevelThree from './LevelThree';
import LevelFour from './LevelFour';
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
                
                <Route path='/Template' component={Template}/>

                <Route path='/LevelOne' component={LevelOne} />
                <Route path='/LevelTwo' component={LevelTwo} />
                <Route path='/LevelThree' component={LevelThree} />
                <Route path='/LevelFour' component={LevelFour} />


                <Route path='/Standard' component={Standard} />

                <Route path='/Custom' component={Custom}/>
    

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
