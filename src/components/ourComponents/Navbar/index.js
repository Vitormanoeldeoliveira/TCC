import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { autoDecodeToken } from '../../screens/Login/token/decodeToken';

import Engrenagem from '../../../Images/engrenagem.png'

import AvatarFlower from '../../../Images/Avatar/flower.png'

const pages = ['Plantações', 'Sobre', 'Início'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar = () => {
  const decodedToken = autoDecodeToken();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (props) => {
    const value = props.target.value

    if(value == 'AvarMedium') {
      window.location.href = 'http://localhost:3000'
    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        bgcolor: "#75a79c"
      }} 
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <IconButton
            value="AvarMedium"
            onClick={
              (props) => handleCloseNavMenu(props)
            } 
          >
            <Avatar alt="Remy Sharp" src={AvatarFlower} sx={{ display: {xs: 'none', md: 'flex'} }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="/"
            sx={{
              // mr: 2,
              ml: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'FontePersonalizada',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            {decodedToken.nome}
          </Typography>

          {/* Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography 
                    textAlign="center"
                    sx={{ fontFamily: 'FontePersonalizada' }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography 
                  textAlign="center"
                  sx={{ fontFamily: 'FontePersonalizada' }}
                >
                  Configurações
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'FontePersonalizada',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            ESTUFA
          </Typography>

          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' },
              // bgcolor: "lightblue",
              justifyContent: 'center'
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                
                sx={{ 
                  my: 2, 
                  color: 'black', 
                  display: 'block',
                  fontFamily: 'FontePersonalizada',
                  fontWeight: 700,
                  fontSize: "1em",
                  mr: "9em" 
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{
                  p: 0,
                  display: {
                    xs: '',
                    md: 'none'
                  }
                }}
              >
                <Avatar 
                  alt="Remy Sharp" 
                  src={AvatarFlower}
                  // onClick={handleCloseNavMenu}
                />
              </IconButton>
              <IconButton
                onClick={handleCloseNavMenu} 
                sx={{
                  p: 0,
                  mt: 1,
                  display: {
                    xs: 'none',
                    md: 'block'
                  }
                }}
              >
                <img src={Engrenagem} />
              </IconButton>
            {/* </Tooltip> */}
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}