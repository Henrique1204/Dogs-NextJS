'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { handleApiError } from '@/core/utils/apiError';
import { PHOTO_POST } from '@/core/utils/api';

const photoPost = async (_: any, formData: FormData) => {
	try {
		const token = cookies().get('token')?.value;

		if (!token) {
			throw new Error('Você não tem permissão para adicionar a foto!');
		}

		const name = formData.get('nome') as string | null;
		const weigth = formData.get('peso') as string | null;
		const birthdate = formData.get('idade') as string | null;
		const img = formData.get('img') as File;

		if (!name || !weigth || !birthdate || img.size === 0) {
			throw new Error('Preencha os dados!');
		}

		const { url: photoPostUrl } = PHOTO_POST();

		const response = await fetch(photoPostUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!response.ok) throw new Error('Erro ao tentar adicionar foto!');

		return {
			ok: true,
			error: '',
			data: null,
		};
	} catch (error: unknown) {
		return handleApiError(error);
	} finally {
		revalidateTag('photos');
		redirect('/conta');
	}
};

export default photoPost;
