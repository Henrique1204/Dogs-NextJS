import Image from 'next/image';
import Link from 'next/link';

import userGet from '@/actions/user-get';

import styles from './index.module.css';

const Header = async () => {
	const { data: user, ok: hasUserLoggedIn } = await userGet();

	return (
		<header className={styles.header}>
			<nav className={`${styles.nav} container`}>
				<Link className={styles.logo} href='/'>
					<Image
						src='/assets/dogs.svg'
						alt='Dogs'
						width={28}
						height={22}
						priority
					/>
				</Link>

				{hasUserLoggedIn ? (
					<Link className={styles.login} href='/conta'>
						{user.username}
					</Link>
				) : (
					<Link className={styles.login} href='/login'>
						Login / Criar
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Header;
