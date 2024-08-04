import { notFound } from 'next/navigation';

import photoGet from '@/actions/photo-get';

import PhotoContent from '@/components/Photo/PhotoContent';

type FotoIdPageProps = {
	params: { id: string };
};

export async function generateMetadata({ params }: FotoIdPageProps) {
	const { data: photoWithComments } = await photoGet(params.id);

	if (!photoWithComments) {
		return {
			title: 'Página não encontrada',
		};
	}

	return {
		title: photoWithComments?.photo?.title,
	};
}

const FotoIdPage = async ({ params }: FotoIdPageProps) => {
	const { data: photoWithComments } = await photoGet(params.id);

	if (!photoWithComments) return notFound;

	return (
		<section className='container mainContainer'>
			<PhotoContent data={photoWithComments} single={true} />
		</section>
	);
};

export default FotoIdPage;
