import styles from './index.module.css';

const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.login}>
			<div className={styles.forms}>{children}</div>
		</div>
	);
};

export default LoginLayout;
