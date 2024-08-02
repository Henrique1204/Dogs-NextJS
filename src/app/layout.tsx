import type { Metadata } from 'next';

import { type_second } from '@/functions/fonts';

import { UserContextProvider } from '@/context/user-context';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';
import userGet from '@/actions/user-get';

export const metadata: Metadata = {
	title: 'Dogs Next',
	description: 'Rede social para cachorros.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data: user } = await userGet();

	return (
		<html className={type_second.variable} lang='pt-BR'>
			<body>
				<UserContextProvider user={user}>
					<div className='App'>
						{/* @ts-expect-error Async Server Component */}
						<Header />

						<main className='AppBody'>{children}</main>

						<Footer />
					</div>
				</UserContextProvider>
			</body>
		</html>
	);
}
