'use server';

import { redirect } from 'next/navigation';

import { handleApiError } from '@/core/utils/apiError';
import { PASSWORD_RESET } from '@/core/utils/api';

const passwordReset = async (_: any, formData: FormData) => {
	try {
		const login = formData.get('login') as string | null;
		const key = formData.get('key') as string | null;
		const password = formData.get('password') as string | null;

		if (!login || !key || !password) throw new Error('Preencha os dados!');

		const { url: passwordResetUrl } = PASSWORD_RESET();

		const response = await fetch(passwordResetUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login,
				key,
				password,
			}),
		});

		if (!response.ok) throw new Error('Não autorizado!');

		return {
			ok: true,
			error: '',
			data: null,
		};
	} catch (error: unknown) {
		return handleApiError(error);
	} finally {
		redirect('/login');
	}
};

export default passwordReset;
