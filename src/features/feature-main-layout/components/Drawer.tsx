import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import { history } from '../../../core-features/feature-redux/configureStore';

import { Todo } from '../../../modules/module-todo-list/client/model-todo';

// ======================================================
// MODULE
// ======================================================
import TodoIcon from './TodoIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  drawerHeader: { ...theme.mixins.toolbar },
}));

export default function Drawer(props: { todoList: Todo[] }) {
  const {
    todoList,
  } = props;
  const classes = useStyles();

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
        <ListItem button onClick={() => history.push('/todo')}>
          <ListItemIcon>
            <TodoIcon todoList={ todoList }/>
          </ListItemIcon>
          <ListItemText primary="Todo"/>
        </ListItem>
      </List>
    </div>
  );
}
