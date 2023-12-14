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
import MenuItem from '@mui/material/MenuItem';
import { autoDecodeToken } from '../../screens/Login/token/decodeToken';

import Engrenagem from '../../../Images/engrenagem.png'
import Ajuda from '../../../Images/ajuda.png'
import Help from '../../screens/helper/help';

const pages = ['Dashboard', 'Plantações', 'Sobre'];

export const Navbar = () => {
  const decodedToken = autoDecodeToken();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [help, setHelp] = React.useState({
    open: false,
    screen: ""
  })

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (ev) => {
    const value = ev
    
    if(value === 'userConfig') {
      const novaURL = 'http://localhost:3000/userConfig'
      window.location.href = novaURL;
    } else if(value === 'Plantações') {
      const novaURL = 'http://localhost:3000/plantations'
      window.location.href = novaURL;
    } else if(value === 'Sobre'){
      const novaURL = 'http://localhost:3000/aboutUs'
      window.location.href = novaURL;
    } else if(value === 'Documentação') {
      const novaURL = 'http://localhost:3000/documentation'
      window.location.href = novaURL;
    } else if(value === 'systemConfig') {
      const novaURL = 'http://localhost:3000/systemConfig'
      window.location.href = novaURL;
    } else if(value === 'Dashboard') {
      const novaURL = 'http://localhost:3000/dashboard'
      window.location.href = novaURL;
    }

    setAnchorElNav(null);
  };

  const helperScreen = () => {
    const url = window.location.pathname.split('/')[1]

    switch (url) {
      case 'dashboard': setHelp((help) => ({ ...help, screen: 'Dashboard', open: true }))
      break;
      case 'plantations': setHelp((help) => ({ ...help, screen: 'Plantações', open: true }))
      break;
      case 'harvest': setHelp((help) => ({ ...help, screen: 'Safras', open: true }))
      break;
      case '': setHelp((help) => ({ ...help, screen: 'Dashboard', open: true }))
      break;
    
      default:
      break;
    }
  }

  return (
    <>
      <AppBar 
        position="static" 
        sx={{
          bgcolor: "#75a79c"
        }} 
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              onClick={
                () => handleCloseNavMenu("userConfig")
              } 
            >
              <Avatar alt="Remy Sharp" src={decodedToken.avatar} sx={{ display: {xs: 'none', md: 'flex'} }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                ml: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'FontePersonalizada',
                fontWeight: 700,
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
                  <MenuItem 
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                  >
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
            {/* Fim do modo mobile */}

            <Box 
              sx={{ 
                flexGrow: 1, 
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center'
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  
                  sx={{ 
                    my: 2, 
                    color: 'black', 
                    display: 'block',
                    fontFamily: 'FontePersonalizada',
                    fontWeight: 700,
                    fontSize: "1em",
                    mr: "6em" 
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <IconButton 
                  onClick={() => handleCloseNavMenu("userConfig")} 
                  sx={{
                    p: 0,
                    display: {
                      xs: 'block',
                      md: 'none'
                    }
                  }}
                >
                  <Avatar 
                    src={decodedToken.avatar}
                  />
                </IconButton>
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 1
                  }}
                >
                  <IconButton
                    onClick={ () => helperScreen() } 
                    sx={{
                      p: 0,
                      mt: 1,
                      mr: 1,
                      display: {
                        xs: 'none',
                        md: 'block'
                      }
                    }}
                  >
                    <img src={Ajuda} />
                  </IconButton>
                  <IconButton
                    onClick={ () => handleCloseNavMenu("systemConfig") } 
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
                </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {help.open && (
        <Help
          setOpenModal={(value) => setHelp((help) => ({ ...help, open: value }))}
          openModal={help.open}
          screen={help.screen}
        />
      )}
    </>
  );
}