'use server';

import { cookies } from 'next/headers';

import { TOKEN_VALIDATE_POST } from '@/core/utils/api';
import { handleApiError } from '@/core/utils/apiError';

export type statsData = {
	id: number;
	title: string;
	acessos: string;
};

const validateToken = async () => {
	try {
		const token = cookies().get('token')?.value;

		if (!token) throw new Error('Token não encontrado');

		const { url: validateTokenUrl } = TOKEN_VALIDATE_POST();

		const response = await fetch(validateTokenUrl, {
			method: 'POST',
			next: { revalidate: 60 },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) throw new Error('Erro ao validar token.');

		return { data: null, ok: true, error: '' };
	} catch (error: unknown) {
		console.log(error);
		return handleApiError(error);
	}
};

export default validateToken;
