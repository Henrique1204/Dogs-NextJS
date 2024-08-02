'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/actions/logout';

import { useUser } from '@/context/user-context';

import useMedia from '@/hooks/useMedia';

import * as Icons from '@/components/Icons';

import { TITLE_BY_PAGE_URL, PAGES_URL } from './constants';

import styles from './index.module.css';

const AccountHeader = () => {
	const { setUser } = useUser();
	const [mobileMenu, setMobileMenu] = React.useState(false);

	const pathname = usePathname();

	const mobile = useMedia('(max-width: 40rem)');

	const handleLogout = async () => {
		await logout();

		setUser(null);
	};

	React.useEffect(() => {
		setMobileMenu(false);
	}, [pathname]);

	return (
		<header className={styles.header}>
			<h1 className='titulo'>{TITLE_BY_PAGE_URL[pathname]}</h1>

			{mobile && (
				<button
					aria-label='Menu'
					onClick={() => setMobileMenu(!mobileMenu)}
					className={`${styles.mobileButton} ${
						mobileMenu && styles.mobileButtonAtivo
					}`}
				></button>
			)}

			<nav
				className={`${mobile ? styles.navMobile : styles.nav} ${
					mobileMenu && styles.navMobileAtivo
				}`}
			>
				<Link
					href='/conta'
					className={pathname === PAGES_URL.MY_ACCOUNT ? styles.ativo : ''}
				>
					<Icons.MyPhotosIcon />
					{mobile && 'Minhas Fotos'}
				</Link>

				<Link
					href='/conta/estatisticas'
					className={pathname === PAGES_URL.STATISTICS ? styles.ativo : ''}
				>
					<Icons.StatisticsIcon />
					{mobile && 'Estátisticas'}
				</Link>

				<Link
					href='/conta/postar'
					className={pathname === PAGES_URL.ADD_PHOTO ? styles.ativo : ''}
				>
					<Icons.AddPhotoIcon />
					{mobile && 'Adicionar Fotos'}
				</Link>

				<button onClick={handleLogout}>
					<Icons.LogoutIcon />
					{mobile && 'Sair'}
				</button>
			</nav>
		</header>
	);
};

export default AccountHeader;
