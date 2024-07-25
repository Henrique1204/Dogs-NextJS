import { Metadata } from 'next';

import RegisterForm from '@/components/Login/RegisterForm';

export const metadata: Metadata = {
	title: 'Crie sua conta.',
	description: 'Crie sua conta no site Dogs.',
};

const CriarPage = async () => {
	return (
		<div className='animarEsquerda'>
			<h1 className='titulo'>Cadastre-se</h1>

			<RegisterForm />
		</div>
	);
};

export default CriarPage;
