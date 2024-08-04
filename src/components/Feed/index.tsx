'use client';

import React from 'react';

import photosGet, { Photo } from '@/actions/photos-get';

import FeedPhotos from './FeedPhotos';

type FeedProps = {
	photos: Photo[];
	username?: 0 | string;
};

const Feed = ({ photos, username = 0 }: FeedProps) => {
	const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
	const [page, setPage] = React.useState<number>(1);

	const [isFetchingPhotsState, setIsFetchingPhotsState] =
		React.useState<boolean>(false);

	const [infiniteScrollIsActive, setInfiniteScrollIsActive] =
		React.useState<boolean>(photos.length === 6);

	const isFetchingPhotosRef = React.useRef(false);

	const handleInfiniteScroll = () => {
		if (isFetchingPhotosRef?.current) return;

		isFetchingPhotosRef.current = true;
		setIsFetchingPhotsState(true);

		setTimeout(() => {
			setPage((currentPage) => currentPage + 1);

			isFetchingPhotosRef.current = false;
			setIsFetchingPhotsState(false);
		}, 1000);
	};

	React.useEffect(() => {
		if (page === 1) return;

		const getPhotosByPage = async () => {
			const photosData = await photosGet(
				{
					page,
					total: 6,
					user: username,
				},
				{
					cache: 'no-store',
				}
			);

			const photosByPage = photosData.data;

			if (!photosData.ok || !photosByPage) return;

			setPhotosFeed((prevPhotos) => prevPhotos.concat(photosByPage));

			const isIncompletePage = photosByPage.length < 6;

			if (isIncompletePage) setInfiniteScrollIsActive(false);
		};

		getPhotosByPage();
	}, [page]);

	React.useEffect(() => {
		if (infiniteScrollIsActive) {
			window.addEventListener('wheel', handleInfiniteScroll);
			window.addEventListener('scroll', handleInfiniteScroll);
		}

		return () => {
			window.removeEventListener('wheel', handleInfiniteScroll);
			window.removeEventListener('scroll', handleInfiniteScroll);
		};
	}, [infiniteScrollIsActive]);

	return (
		<>
			<FeedPhotos photos={photosFeed} />
			{isFetchingPhotsState && <p>Carregando...</p>}
		</>
	);
};

export default Feed;
