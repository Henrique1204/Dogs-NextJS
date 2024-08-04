'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { PhotoWithComments } from '@/actions/photo-get';

import { useUser } from '@/context/user-context';

import styles from './index.module.css';

import PhotoDelete from '../PhotoDelete';
import PhotoComments from '../PhotoComments';

type PhotoContent = {
	data: PhotoWithComments;
	single?: boolean;
};

const PhotoContent = ({ data, single }: PhotoContent) => {
	const { user } = useUser();
	const { photo, comments } = data;

	if (!photo) return notFound();

	return (
		<div className={`${styles.photo} ${single ? styles.single : ''}`}>
			<div className={styles.img}>
				<Image src={photo.src} alt={photo.title} width={1000} height={1000} />
			</div>

			<div className={styles.details}>
				<p className={styles.author}>
					{user && user.username === photo.author ? (
						<PhotoDelete id={String(photo.id)} />
					) : (
						<Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
					)}

					<span className={styles.visualizacoes}>{photo.acessos}</span>
				</p>

				<h1 className='titulo'>
					<Link href={`/foto/${photo.id}`}>{photo.title}</Link>
				</h1>

				<ul className={styles.atributos}>
					<li>{photo.peso} Kg</li>
					<li>{photo.idade} anos</li>
				</ul>
			</div>

			<PhotoComments
				id={String(photo.id)}
				comments={comments}
				single={single}
			/>
		</div>
	);
};

export default PhotoContent;
