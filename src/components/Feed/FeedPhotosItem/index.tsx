'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Photo } from '@/actions/photos-get';

import styles from './index.module.css';

const FeedPhotosItem = ({ photo }: { photo: Photo }) => {
	if (!photo) return null;

	return (
		<li className={styles.photo}>
			<Link href={`/foto/${photo.id}`} scroll={false}>
				<Image
					src={photo.src}
					alt={photo.title}
					width={1500}
					height={1500}
					sizes='80vw'
				/>

				<span>{photo.acessos}</span>
			</Link>
		</li>
	);
};

export default FeedPhotosItem;
