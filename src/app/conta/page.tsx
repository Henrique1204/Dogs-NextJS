import { Metadata } from 'next';

import photosGet from '@/actions/photos-get';
import userGet from '@/actions/user-get';

import Feed from '@/components/Feed';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Minha Conta.',
};

const ContaPage = async () => {
	const { data: user } = await userGet();

	const { data: photos } = await photosGet({
		user: user?.username + '2',
	});

	const hasPhotos = photos && photos?.length > 0;

	return (
		<main>
			{hasPhotos ? (
				<Feed photos={photos!} />
			) : (
				<div>
					<p
						style={{ color: '#444', fontSize: '1.25rem', marginBottom: '1rem' }}
					>
						Nenhuma foto encontrada.
					</p>

					<Link
						href='/conta/postar'
						className='button'
						style={{ display: 'inline-block' }}
					>
						Postar Foto
					</Link>
				</div>
			)}
		</main>
	);
};

export default ContaPage;
