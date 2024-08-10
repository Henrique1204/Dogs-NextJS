import photosGet from '@/actions/photos-get';

import Feed from '@/components/Feed';

const UserPage = async ({ params }: { params: { user: string } }) => {
	const { data } = await photosGet();

	if (!data) return null;

	return (
		<section className='animarEsquerda container mainContainer'>
			<h1 className='titulo'>{params.user}</h1>

			<Feed photos={data} username={params.user} />
		</section>
	);
};

export default UserPage;
