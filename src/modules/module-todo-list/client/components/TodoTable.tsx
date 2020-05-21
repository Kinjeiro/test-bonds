import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';

import { useActions } from '../../../../core-features/feature-redux/use-actions';

// ======================================================
// MODULE
// ======================================================
import * as TodoActions from '../redux-actions-todo-list';
import { Todo } from '../model-todo';
import { selectTodoList } from '../redux-selectors-todo-list';


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
	const todoActions = useActions(TodoActions);

	const onRowClick = (todo: Todo) => {
		if (todo.completed) {
			todoActions.uncompleteTodo(todo.id);
		} else {
			todoActions.completeTodo(todo.id);
		}
	};

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
					{todoList.map((n: Todo) => {
						return (
							<TableRow
								key={n.id}
								hover
								onClick={event => onRowClick(n)}
							>
								<TableCell padding="none">
									<Checkbox checked={n.completed} />
								</TableCell>
								<TableCell padding="none">{n.text}</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() =>
											todoActions.deleteTodo(n.id)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}
