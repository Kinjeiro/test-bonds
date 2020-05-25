import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
//import AssessmentIcon from '@material-ui/icons/Assessment';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import { history } from '../../../../core-features/feature-redux/configureStore';
import { MenuRenderProps } from '../../../../core-features/feature-uni-modules/MenuRenderProps';

// ======================================================
// MODULE
// ======================================================
import MODULE_NAME from '../../module-name';

export default function MenuRenderBonds(props: MenuRenderProps) {
  //const {
  //  isActive,
  //  isMobile,
  //  isSidebar,
  //} = props;

  return (
    <ListItem
      button
      onClick={() => history.push(`/${MODULE_NAME}`)}
    >
      <ListItemIcon>
        <BusinessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Bonds"/>
    </ListItem>
  );
}
