import {
	getAuth,
	createUserWithEmailAndPassword as createUser,
	signInWithEmailAndPassword as signIn,
	signOut,
	updateProfile as changeProfile,
	onAuthStateChanged as onChange,
} from 'firebase/auth';

import { app } from './app';

export const auth = getAuth(app);

export const register = (email, password) => createUser(auth, email, password);

export const login = (email, password) => signIn(auth, email, password);

export const logout = () => signOut(auth);

export const updateProfile = (displayName, photoURL) =>
	changeProfile(auth.currentUser, { displayName, photoURL });

export const onAuthStateChange = (callback) => onChange(auth, callback);
