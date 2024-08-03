import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Minha Conta.',
};

const ContaPage = async () => {
	return (
		<main>
			<h1>Conta</h1>
		</main>
	);
};

export default ContaPage;
