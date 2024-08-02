import AccountHeader from '@/components/Account/AccountHeader';

const ContaLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='container'>
			<AccountHeader />

			{children}
		</div>
	);
};

export default ContaLayout;
