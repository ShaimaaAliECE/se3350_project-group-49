import "./App.css";
import React, { useContext, useEffect, useState } from "react";

import NavbarVer2 from "./NavbarVer2";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from './Register';
import L1Home from "./Pages/Sorting/L1Sorting/L1Home";
import L2Home from "./Pages/Sorting/L2Sorting/L2Home";
import L3Home from "./Pages/Sorting/L3Sorting/L3Home";
import L4Home from "./Pages/Sorting/L4Sorting/L4Home";

import Custom from "./Pages/Practice/Custom";
import Standard from "./Pages/Practice/Standard";
import LessonsHome from "./Pages/Lessons/LessonsHome";
import { ProtectedRoute } from "./ProtectedRoute";
import {AdminRoute} from './AdminRoute';
import Analysis from './Analysis';
import { UserContext } from "./Context/UserContext";
import { authAxios } from "./Interceptors/authAxios";

//Implement Control + C as a button bound.

function App() {
  const [refresh, setRefresh] = useState(true);
  const user = useContext(UserContext);
  
  useEffect(() => {
    if (!user[0]?.accessToken && refresh) {
      setRefresh(false);
      authAxios.get('/auth/refresh').then(res => console.log(res));
    } 
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Home' element={<Home/>}/>
            <Route path="/LessonsHome" element={<LessonsHome/>}/>
            <Route path="/L1Home" element={<L1Home/>}/>
            <Route path="/L2Home" element={<L2Home/>}/>
            <Route path="/L3Home" element={<L3Home/>}/>
            <Route path="/L4Home" element={<L4Home/>}/>
            <Route path="/CustomPractice" element={<Custom/>}/>
            <Route path="/StandardPractice" element={<Standard/>}/>
            <Route element={<AdminRoute/>}>
              <Route path="/Analysis" element={<Analysis/>}/>
            </Route>
          </Route>
        </Routes>
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
