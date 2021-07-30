import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type UserProps = {
	id: string;
	name: string;
	avatar: string;
};

type AuthContexTypes = {
	user: UserProps | undefined;
	sighWithGoogle: () => Promise<void>;
	signOutGoogle: () => Promise<void>;
};

type AuthContextProvider = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContexTypes);

export function AuthContextProvider({ children }: AuthContextProvider) {
	const [user, setUser] = useState<UserProps>();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) return;

			const { displayName, photoURL, uid } = user;

			if (!displayName || !photoURL) {
				throw new Error('User is not properly initialized');
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL,
			});
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const sighWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await auth.signInWithPopup(provider);

		if (result.user) {
			const { displayName, photoURL, uid } = result.user;

			if (!displayName || !photoURL) {
				throw new Error('Missing information from Google Account');
			}

			setUser({
				id: uid,
				avatar: photoURL,
				name: displayName,
			});
		}
	};

	const signOutGoogle = async () => {
		const logout = await auth.signOut();
		console.log(logout);

		setUser(undefined);
	};

	return (
		<AuthContext.Provider value={{ user, sighWithGoogle, signOutGoogle }}>
			{children}
		</AuthContext.Provider>
	);
}
