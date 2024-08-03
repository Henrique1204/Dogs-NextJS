import photosGet from '@/actions/photos-get';
import Feed from '@/components/Feed';

export default async function Home() {
	const { data: photos } = await photosGet();

	return (
		<section className='container mainContainer'>
			<Feed photos={photos || []} />
		</section>
	);
}
