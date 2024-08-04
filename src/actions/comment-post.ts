'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { Comment } from '@/actions/photo-get';

import { handleApiError } from '@/core/utils/apiError';
import { COMMENT_POST } from '@/core/utils/api';

const commentPost = async (_: any, formData: FormData) => {
	try {
		const token = cookies().get('token')?.value;

		if (!token) {
			throw new Error('Você não tem permissão para adicionar a foto!');
		}

		const comment = formData.get('comment') as string | null;
		const id = formData.get('id') as string | null;

		if (!comment || !id) throw new Error('Preencha os dados!');

		const { url: commentPostUrl } = COMMENT_POST(id);

		const response = await fetch(commentPostUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				comment,
			}),
		});

		if (!response.ok) throw new Error('Erro ao tentar adicionar comentário!');

		const data = (await response.json()) as Comment;

		return {
			ok: true,
			error: '',
			data,
		};
	} catch (error: unknown) {
		return handleApiError(error);
	} finally {
		revalidateTag('comment');
	}
};

export default commentPost;
