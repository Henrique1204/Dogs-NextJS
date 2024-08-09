'use server';

import { cookies } from 'next/headers';

import { STATS_GET } from '@/core/utils/api';
import { handleApiError } from '@/core/utils/apiError';

export type statsData = {
	id: number;
	title: string;
	acessos: string;
};

const statsGet = async () => {
	try {
		const token = cookies().get('token')?.value;

		if (!token) throw new Error('Token não encontrado');

		const { url: statsGetUrl } = STATS_GET();

		const response = await fetch(statsGetUrl, {
			next: { revalidate: 60 },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = (await response.json()) as statsData[];

		return { data, ok: true, error: '' };
	} catch (error: unknown) {
		console.log(error);
		return handleApiError(error);
	}
};

export default statsGet;
