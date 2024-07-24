import type { Metadata } from 'next';

import { type_second } from '@/functions/fonts';

import './globals.css';

export const metadata: Metadata = {
	title: 'Dogs Next',
	description: 'Rede social para cachorros.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={type_second.variable} lang='pt-BR'>
			<body>{children}</body>
		</html>
	);
}
