import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import { history } from '../../../core-features/feature-redux/configureStore';
import ClientModule from '../../../core-features/feature-uni-modules/ClientModule';

// ======================================================
// MODULE
// ======================================================
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  drawerHeader: { ...theme.mixins.toolbar },
}));

export interface Props {
  clientModules: ClientModule[],
  isMobile?: boolean,
}

export default function Drawer(props: Props) {
  const {
    clientModules,
    isMobile,
  } = props;
  const classes = useStyles();

  function renderModuleMenuItem(clientModules: ClientModule) {
    const {
      moduleName,
      getRoutes,
      MenuRender,
    } = clientModules;

    return getRoutes && MenuRender && (
      <MenuRender
        { ...props }
        key={ moduleName }
        isMobile={ isMobile }
        isActive={ undefined }
      />
    );
  }

  return (
    <div>
      <div className={classes.drawerHeader}/>
      <Divider/>

      <List>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
      </List>

      <Divider/>

      <List>
        {
          clientModules.map(renderModuleMenuItem)
        }
      </List>
    </div>
  );
}
