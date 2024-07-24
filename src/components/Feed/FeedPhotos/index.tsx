import { Photo } from '@/actions/photos-get';

import FeedPhotosItem from '../FeedPhotosItem';

import styles from './index.module.css';

const FeedPhotos = ({ photos }: { photos: Photo[] }) => {
	return (
		<ul className={`${styles.feed} animarEsquerda`}>
			{photos.map((photo) => (
				<FeedPhotosItem key={photo.id} photo={photo} />
			))}
		</ul>
	);
};

export default FeedPhotos;
