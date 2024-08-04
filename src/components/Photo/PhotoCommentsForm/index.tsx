'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import commentPost from '@/actions/comment-post';
import { Comment } from '@/actions/photo-get';

import * as Icons from '@/components/Icons';
import ErrorMessage from '@/components/Helpers/ErrorMessage';

import styles from './index.module.css';

type PhotoCommentsFormProps = {
	id: string;
	setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
	single?: boolean;
};

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<button className={styles.button} disabled={pending}>
			<Icons.SendIcon />
		</button>
	);
};

const PhotoCommentsForm = ({
	id,
	setComments,
	single,
}: PhotoCommentsFormProps) => {
	const [comment, setComment] = React.useState('');

	const [state, action] = useFormState(commentPost, {
		ok: false,
		error: '',
		data: null,
	});

	React.useEffect(() => {
		if (state.ok && state.data) {
			setComments((prevComments) => prevComments.concat([state.data!]));
		}
	}, [state, setComments]);

	return (
		<form
			action={action}
			className={`${styles.form} ${single ? styles.single : ''}`}
		>
			<textarea
				className={styles.textarea}
				id='comment'
				name='comment'
				placeholder='Comente...'
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			/>

			<input name='id' type='hidden' value={id} />

			<SubmitButton />

			{state.error && <ErrorMessage error={state.error} />}
		</form>
	);
};

export default PhotoCommentsForm;
