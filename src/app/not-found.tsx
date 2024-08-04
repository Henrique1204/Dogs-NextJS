'use client';

import Link from 'next/link';

const NotFound = () => {
	return (
		<section className='container'>
			<h1 className='titulo'>Página não encontrada</h1>

			<Link className='button' href='/' style={{ display: 'inline-block' }}>
				Volte para a home
			</Link>
		</section>
	);
};

export default NotFound;
