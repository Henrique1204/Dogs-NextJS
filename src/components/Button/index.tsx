import React from 'react';

import styles from './index.module.css';

const Button = ({ children, ...props }: React.ComponentProps<'button'>) => {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	);
};

export default Button;
