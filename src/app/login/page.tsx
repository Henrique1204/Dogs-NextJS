import { Metadata } from 'next';

import LoginForm from '@/components/Login/LoginForm';

export const metadata: Metadata = {
	title: 'Login | Dogs.',
	description: 'Logue na sua conta no site Dogs.',
};

const LoginPage = async () => {
	return (
		<section className='animarEsquerda'>
			<h1 className='titulo'>Login</h1>

			<LoginForm />
		</section>
	);
};

export default LoginPage;
