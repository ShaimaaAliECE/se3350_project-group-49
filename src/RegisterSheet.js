import React, {useState} from "react";
import {authAxios} from './Interceptors/authAxios';
import { Grid, Paper, Avatar, TextField, Button, Typography, Checkbox } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link, useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const RegisterSheet = () => {
  const [user, setUser] = useState({username:"", password:""})
  const [valid, setValid] = useState(null);
  const navigate = useNavigate();

  async function tryLogin(e) {
    e.preventDefault();
    if (!valid) return;
    let register = await authAxios.post('/auth/register', {
      username: user.username,
      password: user.password
    });
    console.log(register);
    if (register?.data?.accessToken) navigate('/Home');
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

  const checkPassword = (e) => {
    e.preventDefault();
    if (e.target.value === user.password) setValid(true);
    else setValid(false);
    console.log(user);
  }

  const displayIcon = () => {
    console.log(valid);
    if (valid === null) return <></>;
    if (valid) return <CheckIcon/>;
    return <CloseIcon/>
  }

  const paperStyle = {padding: 20, height:'50vh', width:280, margin:"75px auto"}
  const avatarStyle = {backgroundColor:'lightblue'}
  return (
    <Grid container spacing={2}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center' rowSpacing={2}>
          <Avatar style={avatarStyle}><CalculateIcon/></Avatar>
          <h2>Sign Up</h2>
          <TextField value={user.username} label="Username" placeholder="Enter Username" fullWidth onChange={usernameChange}/>
          <br/>
          <TextField type='submit' value={user.password} label="Password" type="password" placeholder="Enter Password" fullWidth onChange={passwordChange}/>
          <TextField label="Verify Password" type='password' placeholder="Re-Enter Password" onChange={checkPassword} fullWidth />{displayIcon()}
          <Button type='submit' color='primary' variant='contained' fullWidth onClick={tryLogin}>Register</Button>
          <Typography>Already have an account? <Link to='/Login' style={{cursor:'pointer'}}>Login</Link> </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

