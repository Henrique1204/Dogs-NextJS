'use client';

import React from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import passwordLost from '@/actions/password-lost';

import Button from '@/components/Button';
import Input from '@/components/Input';
import ErrorMessage from '@/components/Helpers/ErrorMessage';

import styles from './index.module.css';

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type='submit'>
			{pending ? 'Enviando...' : 'Enviar e-mail'}
		</Button>
	);
};

const LostLoginForm = () => {
	const [state, action] = useFormState(passwordLost, {
		ok: false,
		error: '',
		data: null,
	});

	return (
		<form className={styles.form} action={action}>
			<Input label='E-mail / Usuário' type='text' name='login' />

			<input
				name='url'
				type='hidden'
				value={window.location.href.replace('perdeu', 'resetar')}
			/>

			{state.ok ? (
				<p style={{ color: '#4C1' }}>E-mail enviado.</p>
			) : (
				<SubmitButton />
			)}

			<ErrorMessage error={state.error} />
		</form>
	);
};

export default LostLoginForm;
