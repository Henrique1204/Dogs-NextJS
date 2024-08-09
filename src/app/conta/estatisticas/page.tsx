import React from 'react';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import statsGet from '@/actions/stats-get';

const StatsChart = dynamic(() => import('@/components/Account/StatsChart'), {
	loading: () => <p>Carregando...</p>,
	ssr: false,
});

export const metadata: Metadata = {
	title: 'Estatásticas | Minha Conta.',
};

const EstatisticasPage = async () => {
	const { data } = await statsGet();

	return (
		<React.Suspense fallback={<div></div>}>
			<StatsChart statsData={data || []} />
		</React.Suspense>
	);
};

export default EstatisticasPage;
