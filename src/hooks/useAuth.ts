import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export function useAuth() {
	const value = useContext(AuthContext);
	return value;
}
