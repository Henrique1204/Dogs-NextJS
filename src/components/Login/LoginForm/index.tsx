'use client';

import React from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import login from '@/actions/login';

import Button from '@/components/Button';
import Input from '@/components/Input';
import ErrorMessage from '@/components/Helpers/ErrorMessage';

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type='submit'>
			{pending ? 'Enviando...' : 'Entrar'}
		</Button>
	);
};

const LoginForm = () => {
	const [state, action] = useFormState(login, {
		ok: false,
		error: '',
		data: null,
	});

	React.useEffect(() => {
		if (state.ok) window.location.href = '/conta';
	}, [state.ok]);

	return (
		<>
			<form action={action}>
				<Input
					label='Usuário:'
					type='text'
					name='username'
					placeholder='usuário'
				/>

				<Input
					label='Senha:'
					type='password'
					name='password'
					placeholder='senha'
				/>

				<SubmitButton />

				<ErrorMessage error={state.error} />
			</form>
		</>
	);
};

export default LoginForm;
