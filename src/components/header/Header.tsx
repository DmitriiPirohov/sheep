import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useTranslation } from "react-i18next";
import i18n from 'i18next';

import { Link } from 'react-router-dom';
import { LoginMenu } from '../loginMenu/LoginMenu';

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();
  const pages = t('pages').split('*');
  const nav = t('nav').split('*');
  const languages = t('language').split('*');

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLenguage = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  }

  const style = {
    textDecoration: 'none',
    color: 'inherit'
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={nav[0]} style={style}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </Link>

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
              {pages.map((page, index) => index !== 3
                ? (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={nav[index]}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      key={page}
                    > <Typography textAlign="center">{page}</Typography>

                    </Link>
                  </MenuItem>
                )
                :
                languages.map((language) => (
                  <MenuItem key={language} onClick={() => handleChangeLenguage(language)}>{language}</MenuItem>
                ))
              )}
            </Menu>
          </Box>

          <Link to={nav[0]} style={style}>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => index !== 3
              ? (
                <Link
                  to={nav[index]}
                  style={{
                    textDecoration: 'none'
                  }}
                  key={page}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              )
              :
              <span
                key={page}
                style={{
                  display: 'flex'
                }}
              >
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    color: 'inherit',
                    backgroundColor: 'inherit'
                  }}
                >
                  {page}
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {
                    languages.map((language) => (
                      <MenuItem key={language} onClick={() => handleChangeLenguage(language)}>{language}</MenuItem>
                    ))
                  }
                </Menu>
              </span>
            )}
          </Box>

          <LoginMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
