import React from 'react';
import {
  AppBar,
  Drawer as DrawerMui,
  Hidden,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '../container/Drawer';
//import logo from './logo.svg';
import { WithRouterProps } from '../../../core-features/feature-router/with-router';

import allClientModules from '../../../all-client-modules';

import useStyles from './MainLayout.css';

export default function MainLayout(props: WithRouterProps) {
  const {
    routes,
  } = props;

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );


  // ======================================================
  // HANDLERS
  // ======================================================
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // ======================================================
  // RENDERS
  // ======================================================
  function renderMenu() {
    return (
      <>
        <Hidden mdUp>
          <DrawerMui
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Drawer
              { ...props }
              clientModules={ allClientModules }
              isMobile={ true }
            />
          </DrawerMui>
        </Hidden>

        <Hidden smDown>
          <DrawerMui
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Drawer
              { ...props }
              clientModules={ allClientModules }
            />
          </DrawerMui>
        </Hidden>
      </>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon/>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap={isMobile}
            >
              Create-React-App with Material-UI, Typescript,
              Redux and Routing
            </Typography>
          </Toolbar>
        </AppBar>

        { renderMenu() }

        {/*<img src={logo} className="App-logo" alt="logo"/>*/}

        <div className={classes.content}>
          { routes }
        </div>
      </div>
    </div>
  );
}
