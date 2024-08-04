'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { handleApiError } from '@/core/utils/apiError';
import { PHOTO_DELETE } from '@/core/utils/api';

const photoDelete = async (id: string) => {
	try {
		const token = cookies().get('token')?.value;

		if (!token) {
			throw new Error('Você não tem permissão para deletar a foto!');
		}

		const { url: photoDeleteUrl } = PHOTO_DELETE(id);

		const response = await fetch(photoDeleteUrl, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) throw new Error('Erro ao tentar deletar foto!');

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

export default photoDelete;
