import React from 'react';

type ErrorMessageProps = React.ComponentProps<'small'> & {
	error?: string;
};

const ErrorMessage = ({ error, style }: ErrorMessageProps) => {
	if (!error) return null;

	return (
		<small
			style={{ color: '#F31', margin: '1rem 0', display: 'block', ...style }}
		>
			{error}
		</small>
	);
};

export default ErrorMessage;
