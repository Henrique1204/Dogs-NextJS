import { Photo } from '@/actions/photos-get';

import FeedPhotos from './FeedPhotos';

const Feed = ({ photos }: { photos: Photo[] }) => {
	return <FeedPhotos photos={photos} />;
};

export default Feed;
