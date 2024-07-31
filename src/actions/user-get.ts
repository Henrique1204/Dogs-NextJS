'use server';

import { cookies } from 'next/headers';

import { handleApiError } from '@/core/utils/apiError';
import { USER_GET } from '@/core/utils/api';

type User = {
	id: number;
	email: string;
	username: string;
	nome: string;
};

const userGet = async () => {
	try {
		const token = cookies().get('token')?.value;

		if (!token) throw new Error('Token não encontrado');

		const { url: getUserUlr } = USER_GET();

		const response = await fetch(getUserUlr, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			next: {
				revalidate: 60,
			},
		});

		const data = (await response.json()) as User | null;

		if (!response.ok || !data) throw new Error('Usuário não encontrados.');

		return { data, ok: true, error: '' };
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export default userGet;
