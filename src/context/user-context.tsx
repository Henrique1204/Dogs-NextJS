'use client';

import React from 'react';

import { logout } from '@/actions/logout';
import validateToken from '@/actions/validate-token';

type User = {
	id: number;
	nome: string;
	username: string;
	email: string;
};

type UserContextValues = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = React.createContext<UserContextValues | null>(null);

export const useUser = () => {
	const context = React.useContext(UserContext);

	if (context === null) {
		throw new Error('useContext deve estar dentro do Provider.');
	}

	return context as UserContextValues;
};

export function UserContextProvider({
	children,
	user,
}: {
	children: React.ReactNode;
	user: User | null;
}) {
	const [userState, setUserState] = React.useState<User | null>(user);

	React.useEffect(() => {
		const validateTokenEffect = async () => {
			const { ok } = await validateToken();

			if (!ok) logout();
		};

		if (userState) validateTokenEffect();
	}, [userState]);

	return (
		<UserContext.Provider value={{ user: userState, setUser: setUserState }}>
			{children}
		</UserContext.Provider>
	);
}
