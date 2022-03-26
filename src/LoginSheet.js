import React, {useState} from "react";
import {authAxios} from './Interceptors/authAxios';
import { Grid, Paper, Avatar, TextField, Button, Typography, Checkbox } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link, useNavigate } from "react-router-dom";

export const LoginSheet = () => {
  const [user, setUser] = useState({username:"", password:""})
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();

  async function tryLogin(e) {
    e.preventDefault();
    let login = await authAxios.post('/auth/login', {
      username: user.username,
      password: user.password
    });
    console.log(login);
    if (login?.data?.accessToken) navigate('/Home');
    else setUser({username:"", password:""})
  }

  const usernameChange = (e) => {
    e.preventDefault();
    setUser({password:user.password, username: e.target.value});
  }

  const passwordChange = (e) => {
    e.preventDefault();
    setUser({username:user.username, password: e.target.value});
  }

  const adminChange = (e) => {
    e.preventDefault();
    console.log(isAdmin);
    setAdmin(!isAdmin);
  }

  const paperStyle = {padding: 20, height:'50vh', width:280, margin:"75px auto"}
  const avatarStyle = {backgroundColor:'lightblue'}
  return (
    <Grid container spacing={2}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center' rowSpacing={2}>
          <Avatar style={avatarStyle}><CalculateIcon/></Avatar>
          <h2>Sign In</h2>
          <TextField value={user.username} label="Username" placeholder="Enter Username" fullWidth onChange={usernameChange}/>
          <br/>
          <TextField type='submit' value={user.password} label="Password" type="password" placeholder="Enter Password" fullWidth onChange={passwordChange}/>
          <Button type='submit' color='primary' variant='contained' fullWidth onClick={tryLogin}>Login</Button>
          <Typography>Don't have an account? <Link to='/Register' style={{cursor:'pointer'}}>Register</Link> </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

