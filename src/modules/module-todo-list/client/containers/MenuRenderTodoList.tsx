import React from 'react';
import { useSelector } from 'react-redux';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { history } from '../../../../core-features/feature-redux/configureStore';
import { MenuRenderProps } from '../../../../core-features/feature-uni-modules/MenuRenderProps';

// ======================================================
// MODULE
// ======================================================
import MODULE_NAME from '../../module-name';
import TodoIcon from '../components/TodoIcon';
import { selectTodoList } from '../redux-selectors-todo-list';

export default function MenuRenderTodoList(props: MenuRenderProps) {
  //const {
  //  isActive,
  //  isMobile,
  //  isSidebar,
  //} = props;

  const todoList = useSelector(selectTodoList);

  return (
    <ListItem
      button
      onClick={() => history.push(`/${MODULE_NAME}`)}
    >
      <ListItemIcon>
        <TodoIcon todoList={ todoList }/>
      </ListItemIcon>
      <ListItemText primary="Todo"/>
    </ListItem>
  );
}
