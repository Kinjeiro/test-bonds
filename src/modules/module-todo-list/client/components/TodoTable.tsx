import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';

import { useActions } from '../../../../core-features/feature-redux/use-actions';

// ======================================================
// MODULE
// ======================================================
import { Todo } from '../model-todo';
import { selectTodoList } from '../redux-selectors-todo-list';
import { actions } from '../redux-todo-list';


const useStyles = makeStyles({
  paper: {
    width: '100%',
    minWidth: 260,
    display: 'inline-block',
  },
  table: {
    width: '100%',
  },
});

export default function TodoTable() {
	const classes = useStyles();
	const todoList = useSelector(selectTodoList);
	const {
	  actionToggleTodo,
    actionDeleteTodo,
	} = useActions(actions);


	// ======================================================
	// RENDERS
	// ======================================================
	const renderRow = (todo: Todo) => {
	  const {
	    id,
      completed,
      text,
    } = todo;

	  return (
      <TableRow
        key={id}
        hover
        onClick={event => actionToggleTodo(id)}
      >
        <TableCell padding="none">
          <Checkbox checked={completed} />
        </TableCell>
        <TableCell padding="none">{text}</TableCell>
        <TableCell padding="none">
          <IconButton
            aria-label="Delete"
            color="default"
            onClick={ (event) => {
              event.stopPropagation();
              actionDeleteTodo(id);
            } }
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };


	// ======================================================
	// MAIN RENDER
	// ======================================================
	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Completed</TableCell>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todoList.map(renderRow)}
				</TableBody>
			</Table>
		</Paper>
	);
}
