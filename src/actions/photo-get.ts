'use server';

import { PHOTO_GET } from '@/core/utils/api';
import { handleApiError } from '@/core/utils/apiError';

import { Photo } from './photos-get';

export type Comment = {
	comment_ID: string;
	comment_post_ID: string;
	comment_author: string;
	comment_content: string;
};

export type PhotoWithComments = {
	photo: Photo;
	comments: Comment[];
};

const photoGet = async (id: string) => {
	try {
		const { url: photoGetUrl } = PHOTO_GET(id);

		const response = await fetch(photoGetUrl, {
			next: { revalidate: 30, tags: ['photos', 'comment'] },
		});

		const data = (await response.json()) as PhotoWithComments;

		return { data, ok: true, error: '' };
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export default photoGet;
