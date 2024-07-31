import { Metadata } from 'next';

import PasswordResetForm from '@/components/Login/PasswordResetForm';

export const metadata: Metadata = {
	title: 'Resetar a senha | Dogs.',
	description: 'Resete a sua senha.',
};

type SearchParams = { searchParams: { key: string; login: string } };

const ResetarPage = async ({ searchParams }: SearchParams) => {
	return (
		<div className='animarEsquerda'>
			<h1 className='titulo'>Resete a Senha</h1>

			<PasswordResetForm
				keyToken={searchParams.key}
				login={searchParams.login}
			/>
		</div>
	);
};

export default ResetarPage;
