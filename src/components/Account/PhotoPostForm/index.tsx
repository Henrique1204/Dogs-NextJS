'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import Button from '@/components/Button';
import Input from '@/components/Input';

import styles from './index.module.css';
import ErrorMessage from '@/components/Helpers/ErrorMessage';
import photoPost from '@/actions/photo-post';

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type='submit'>
			{pending ? 'Carregando...' : 'Enviar'}
		</Button>
	);
};

const PhotoPostForm = () => {
	const [img, setImg] = React.useState<{
		preview?: string;
		raw?: File;
	}>({});

	const [state, action] = useFormState(photoPost, {
		ok: false,
		error: '',
		data: null,
	});

	const handleImgChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		if (!target || target.files === null) return;

		setImg({
			preview: URL.createObjectURL(target.files[0]),
			raw: target.files[0],
		});
	};

	return (
		<section className={`${styles.photoPost} animarEsquerda`}>
			<form action={action}>
				<Input label='Nome:' type='text' name='nome' />
				<Input label='Peso:' type='number' name='peso' />
				<Input label='Idade:' type='number' name='idade' />

				<input
					id='img'
					className={styles.img}
					name='img'
					type='file'
					onChange={handleImgChange}
				/>

				<SubmitButton />

				<ErrorMessage error={state.error} />
			</form>

			{img.preview && (
				<div
					className={styles.preview}
					style={{ backgroundImage: `url(${img.preview})` }}
				></div>
			)}
		</section>
	);
};

export default PhotoPostForm;
