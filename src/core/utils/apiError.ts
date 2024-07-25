export const handleApiError = (
	error: unknown
): { data: null; ok: false; error: string } => {
	if (error instanceof Error) {
		return {
			ok: false,
			error: error.message,
			data: null,
		};
	}

	return {
		ok: false,
		error: 'Houve um problema, tente novamente mais tarde.',
		data: null,
	};
};
