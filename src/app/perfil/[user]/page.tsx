const UserPage = async ({ params }: { params: { user: string } }) => {
	return (
		<main>
			<h1>User Page: {params.user}</h1>
		</main>
	);
};

export default UserPage;
