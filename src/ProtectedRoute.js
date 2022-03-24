import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import auth from './auth'
import Login from "./Login.js";


export const ProtectedRoute = ({component: Component, ...rest }) =>{
    return (
        <Route
        {...rest}
        render={props => {
            if (auth.isAuthenticated()){
                return <Component {...props}/>
            } else{
                return(
                    <Redirect to="/Login"component={Login}/>
                );
            }

        }}
        />
    );
};
