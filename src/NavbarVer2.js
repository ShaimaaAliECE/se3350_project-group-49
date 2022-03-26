import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {GiSlicedBread} from 'react-icons/gi'
import CalculateIcon from '@mui/icons-material/Calculate';
import {AiFillSetting} from 'react-icons/ai'
import { Divider } from "@mui/material";
import { purple } from '@mui/material/colors';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import IdleTimerComponent from './components/IdleTimerComponent'
import { authAxios } from "./Interceptors/authAxios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import { useHistory } from "react-router/cjs/react-router.min"; 

const NavbarVer2 = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  function closeTab(){
    window.close();
}

const logoutUser = (e) => {
  console.log("Logging out...");
  authAxios.get('/auth/logout').then(res => {
    console.log(res);user[1]({});
    console.log("Logged out");})
    window.location.replace('/Login');
}

const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);



  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);


  
  return (
    <AppBar position="fixed"> {/** can be fixed or static */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
           <IconButton  size="large" > <CalculateIcon/>  </IconButton>
          </Typography> 

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IdleTimerComponent></IdleTimerComponent>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
              <MenuItem  component={Link} to= "/Home" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">PG1</Typography> {/* menu items */}
              </MenuItem>
              <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">PG2</Typography> {/* menu items */}
              </MenuItem>
              <MenuItem component={Link} to= "/Template" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">PG3</Typography> {/* menu items */}
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">PG4</Typography> {/* menu items */}
              </MenuItem>
              
            </Menu>
          </Box>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton> ALGO SORT  </IconButton>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
            <Button  component={Link} to= "/Home" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              HOME
            </Button>
            <Button  component={Link} to= "/LessonsHome" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              LESSONS
            </Button>

    
          
         
    
   <Button>
            <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button sx={{ my: 1, color: 'white' }} {...bindTrigger(popupState)}>
            TEST
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem component={Link} to='/L1Home' onClick={popupState.close}>LEVEL 1</MenuItem>
            <MenuItem component={Link} to='/L2Home' onClick={popupState.close}>LEVEL 2</MenuItem>
            <MenuItem component={Link} to='/L3Home' onClick={popupState.close}>LEVEL 3</MenuItem>
            <MenuItem component={Link} to='/L4Home' onClick={popupState.close}>LEVEL 4</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    </Button>





            <Button>
            <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button sx={{ my: 1, color: 'white' }} {...bindTrigger(popupState)}>
            PRACTICE
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem  component={Link} to='/StandardPractice' onClick={popupState.close}>STANDARD</MenuItem>
            <MenuItem  component={Link} to='/CustomPractice' onClick={popupState.close}>CUSTOM</MenuItem>
      
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    </Button>

    {user[0].admin &&
        <Button  component={Link} to= "/Analysis" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
          Analysis
        </Button>
      }

   








              
          </Box>

          <Button sx={{ my: 1, color: 'white' }} onClick={logoutUser}>
                    Logout
          </Button>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarVer2;
