import Image from 'next/image';

import styles from './index.module.css';

const Footer = () => {
	const hasUserLoggedIn = false;

	return (
		<footer className={styles.footer}>
			<Image src='/assets/dogs-footer.svg' alt='Dogs' width={28} height={22} />

			<p>Dogs. Alguns direitos reservados.</p>
		</footer>
	);
};

export default Footer;
