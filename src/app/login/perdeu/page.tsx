import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Perdeu a senha | Dogs.',
	description: 'Recupre a sua senha.',
};

const PerdeuPage = async () => {
	return (
		<main>
			<h1>Perdeu</h1>
		</main>
	);
};

export default PerdeuPage;
