import { Badge } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import React from 'react';

import { Todo } from '../model-todo';

export default function TodoIcon(props: { todoList: Todo[] }) {
  let uncompletedTodos = props.todoList.filter(t => t.completed === false);

  if (uncompletedTodos.length > 0) {
    return (
      <Badge color="secondary" badgeContent={uncompletedTodos.length}>
        <FormatListNumberedIcon/>
      </Badge>
    );
  } else {
    return <FormatListNumberedIcon/>;
  }
}
