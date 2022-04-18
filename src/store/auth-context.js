import { createContext, useContext, useState, useEffect } from 'react';

import { onAuthStateChange } from '../services/firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChange((user) => setUser(user));
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
