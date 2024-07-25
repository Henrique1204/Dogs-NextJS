'use server';

import { handleApiError } from '@/core/utils/apiError';
import { USER_POST } from '@/core/utils/api';
import login from '@/actions/login';

const userPost = async (_: any, formData: FormData) => {
	try {
		const username = formData.get('username') as string | null;
		const email = formData.get('email') as string | null;
		const password = formData.get('password') as string | null;

		if (!username || !password || !email) throw new Error('Preencha os dados!');

		const { url: registerUserUrl } = USER_POST();

		const response = await fetch(registerUserUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		if (!response.ok) throw new Error('E-mail ou usuário já cadastrado!');

		return await login(undefined, formData);
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export default userPost;
