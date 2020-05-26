// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { ChangeEvent, useCallback, useState } from 'react';

import { useActions } from '../../../../core-features/feature-redux/use-actions';

import { actions } from '../redux-todo-list';

const useStyles = makeStyles({
  textField: {
    width: '80%',
    margin: 20,
  },
});

interface Props {
	open: boolean;
	onClose: () => void;
}

export default function TodoDialog(props: Props) {
	const { open, onClose } = props;
	const classes = useStyles();
	const { actionAddTodo } = useActions(actions);

  const [newTodoText, setNewTodoText] = useState('');

  // ======================================================
  // HANDLERS
  // ======================================================
	const handleClose = useCallback(() => {
    actionAddTodo({
			id: Math.random(),
			completed: false,
			text: newTodoText,
		});
		onClose();

		// reset todo text if user reopens the dialog
		setNewTodoText('');
	}, [actionAddTodo, onClose, setNewTodoText, newTodoText]);

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(event.target.value);
	}, [setNewTodoText]);


	// ======================================================
	// MAIN RENDER
	// ======================================================
	return (
		<Dialog
      open={open}
      onClose={handleClose}
    >
			<DialogTitle>Add a new TODO</DialogTitle>
			<TextField
				id="multiline-flexible"
				multiline
				value={newTodoText}
				onChange={handleChange}
				className={classes.textField}
			/>

			<DialogActions>
				<Button
          color="primary"
          onClick={ handleClose }
        >
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
}
