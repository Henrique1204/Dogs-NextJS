const FotoIdPage = async ({ params }: { params: { id: number } }) => {
	return (
		<main>
			<h1>Foto ID: {params.id}</h1>
		</main>
	);
};

export default FotoIdPage;
