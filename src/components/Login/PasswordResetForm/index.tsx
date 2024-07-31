'use client';

import React from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import passwordLost from '@/actions/password-lost';

import Button from '@/components/Button';
import Input from '@/components/Input';
import ErrorMessage from '@/components/Helpers/ErrorMessage';

import styles from './index.module.css';
import passwordReset from '@/actions/password-reset';

type PasswordResetFormProps = { keyToken: string; login: string };

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type='submit'>
			{pending ? 'Resetando...' : 'Resetar senha'}
		</Button>
	);
};

const PasswordResetForm = ({ keyToken, login }: PasswordResetFormProps) => {
	const [state, action] = useFormState(passwordReset, {
		ok: false,
		error: '',
		data: null,
	});

	return (
		<form className={styles.form} action={action}>
			<Input label='Senha' type='password' name='password' />

			<input name='key' type='hidden' value={keyToken} />
			<input name='login' type='hidden' value={login} />

			<SubmitButton />

			<ErrorMessage error={state.error} />
		</form>
	);
};

export default PasswordResetForm;
