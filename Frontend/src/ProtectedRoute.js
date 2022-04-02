import { Navigate, Outlet } from 'react-router-dom';
import Login from './Login';

const { useContext } = require("react");
const { UserContext } = require("./Context/UserContext");


export function ProtectedRoute() {
    let user= useContext(UserContext);
    //console.log(user);
    if (!user[0]?.accessToken) {
        return <Navigate to={<Login/>}/>;
    }
  
    return <Outlet />;
  }