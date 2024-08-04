'use client';

import React from 'react';

import photoDelete from '@/actions/photo-delete';

import styles from './index.module.css';

const PhotoDelete = ({ id }: { id: string }) => {
	const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

	async function handleClick() {
		setIsDeleting(true);
		const confirm = window.confirm('Tem certeza que quer deletar?');

		if (confirm) await photoDelete(id);

		setIsDeleting(false);
	}

	return (
		<button
			className={styles.delete}
			onClick={handleClick}
			disabled={isDeleting}
		>
			Deletar
		</button>
	);
};

export default PhotoDelete;
