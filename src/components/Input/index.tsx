import React from 'react';

import ErrorMessage from '@/components/Helpers/ErrorMessage';

import styles from './index.module.css';

type InputProps = React.ComponentProps<'input'> & {
	label: string;
	error?: string;
};

const Input = ({ label, name, error, ...props }: InputProps) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>

			<input id={name} name={name} className={styles.input} {...props} />

			<ErrorMessage
				error={error}
				style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}
			/>
		</div>
	);
};

export default Input;
