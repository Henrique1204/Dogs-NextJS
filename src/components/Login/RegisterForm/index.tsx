'use client';

import React from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import userPost from '@/actions/user-post';

import Button from '@/components/Button';
import Input from '@/components/Input';
import ErrorMessage from '@/components/Helpers/ErrorMessage';

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type='submit'>
			{pending ? 'Cadastrando...' : 'Cadastrar'}
		</Button>
	);
};

const RegisterForm = () => {
	const [state, action] = useFormState(userPost, {
		ok: false,
		error: '',
		data: null,
	});

	React.useEffect(() => {
		if (state.ok) window.location.href = '/conta';
	}, [state.ok]);

	return (
		<form action={action}>
			<Input label='Usuário:' type='text' name='username' />

			<Input label='Email:' type='email' name='email' />

			<Input label='Senha:' type='password' name='password' />

			<SubmitButton />

			<ErrorMessage error={state.error} />
		</form>
	);
};

export default RegisterForm;
