import { createContext, useContext, useState, useEffect } from 'react';

import { onAuthStateChange } from '../services/firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
