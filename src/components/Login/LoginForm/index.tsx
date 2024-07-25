'use client';

import React from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import Link from 'next/link';

import login from '@/actions/login';

import Button from '@/components/Button';
import Input from '@/components/Input';
import ErrorMessage from '@/components/Helpers/ErrorMessage';

import styles from './index.module.css';

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
			<form className={styles.form} action={action}>
				<Input label='Usuário:' type='text' name='username' />

				<Input label='Senha:' type='password' name='password' />

				<SubmitButton />

				<ErrorMessage error={state.error} />
			</form>

			<Link href='/login/perdeu' className={styles.perdeu}>
				Perdeu a senha?
			</Link>

			<div className={styles.cadastro}>
				<h2 className={styles.subtitulo}>Cadastra-se</h2>
				<p>Ainda não possui conta? Cadastre-se no site.</p>

				<Link href='/login/criar' className='button'>
					Cadastro
				</Link>
			</div>
		</>
	);
};

export default LoginForm;
