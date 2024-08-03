import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Estatásticas | Minha Conta.',
};

const EstatisticasPage = async () => {
	return (
		<main>
			<h1>Estatisticas</h1>
		</main>
	);
};

export default EstatisticasPage;
