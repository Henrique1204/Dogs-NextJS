'use server';

import { handleApiError } from '@/core/utils/apiError';
import { PASSWORD_LOST } from '@/core/utils/api';

const passwordLost = async (_: any, formData: FormData) => {
	try {
		const login = formData.get('login') as string | null;
		const url = formData.get('url') as string | null;

		if (!login || !url) throw new Error('Preencha os dados!');

		const { url: passwordLostUrl } = PASSWORD_LOST();

		const response = await fetch(passwordLostUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login,
				url,
			}),
		});

		if (!response.ok) throw new Error('E-mail ou Usuário não encontrado!');

		return {
			ok: true,
			error: '',
			data: null,
		};
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export default passwordLost;
