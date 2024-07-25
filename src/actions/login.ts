'use server';

import { cookies } from 'next/headers';

import { handleApiError } from '@/core/utils/apiError';
import { TOKEN_POST } from '@/core/utils/api';

import { getHoursInSeconds } from '@/core/utils/time';

const login = async (_: any, formData: FormData) => {
	try {
		const username = formData.get('username') as string | null;
		const password = formData.get('password') as string | null;

		if (!username || !password) throw new Error('Preencha os dados!');

		const { url: loginUrl } = TOKEN_POST();

		const response = await fetch(loginUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		if (!response.ok) throw new Error('Usuário ou senha incorretos!');

		const loginResponse = await response.json();

		const ONE_DAY_IN_HOURS = 24;

		cookies().set('token', loginResponse.token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: getHoursInSeconds(ONE_DAY_IN_HOURS),
		});

		return {
			ok: true,
			error: '',
			data: null,
		};
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export default login;
