import { Navigate, Outlet } from 'react-router-dom';
import Login from './Login';
const { useContext } = require("react");
const { UserContext } = require("./Context/UserContext");


export function AdminRoute() {
    let user = useContext(UserContext);
  
    if (!user[0]?.admin) {
      return <Navigate to={<Login/>}/>;
    }
  
    return <Outlet />;
  }