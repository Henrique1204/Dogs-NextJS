'use server';

import { PHOTOS_GET } from '@/core/utils/api';
import { handleApiError } from '@/core/utils/apiError';

export type Photo = {
	id: number;
	author: string;
	title: string;
	date: string;
	src: string;
	peso: string;
	idade: string;
	acessos: string;
	total_comments: string;
};

type SearchParams = Partial<{
	page: number;
	total: number;
	user: 0 | string;
}>;

const photosGet = async (
	searchParams?: SearchParams,
	optionsFront?: RequestInit
) => {
	try {
		const { url: photosGetUrl } = PHOTOS_GET(searchParams);

		const photosGetOptions = optionsFront || {
			next: { revalidate: 30, tags: ['photos'] },
		};

		const response = await fetch(photosGetUrl, photosGetOptions);

		const data = (await response.json()) as Photo[];

		return { data, ok: true, error: '' };
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export default photosGet;
