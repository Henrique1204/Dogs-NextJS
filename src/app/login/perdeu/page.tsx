import { Metadata } from 'next';

import LostLoginForm from '@/components/Login/LostLoginForm';

export const metadata: Metadata = {
	title: 'Perdeu a senha | Dogs.',
	description: 'Recupre a sua senha.',
};

export const dynamic = 'force-dynamic';

const PerdeuPage = async () => {
	return (
		<div className='animarEsquerda'>
			<h1 className='titulo'>Perdeu a senha?</h1>

			<LostLoginForm />
		</div>
	);
};

export default PerdeuPage;
