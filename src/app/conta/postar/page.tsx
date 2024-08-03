import PhotoPostForm from '@/components/Account/PhotoPostForm';
import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
	title: 'Postar | Minha Conta.',
	description: 'Poste suas fotos.',
};

const PostarPage = async () => {
	return <PhotoPostForm />;
};

export default PostarPage;
