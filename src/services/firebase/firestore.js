import {
	getFirestore,
	collection,
	query,
	onSnapshot,
	serverTimestamp,
	orderBy,
	limit,
	addDoc as add,
	getDocs as get,
} from 'firebase/firestore';

import { app } from './app';

export const db = getFirestore(app);

export const addDoc = (path, data) =>
	add(collection(db, path), { ...data, timestamp: serverTimestamp() });

export const getDocs = (path) => get(collection(db, path));

export const loadDocs = (path, direction, limitNum, callback) => {
	const recentDocsQuery = query(
		collection(db, path),
		orderBy('timestamp', direction),
		limit(limitNum)
	);
	onSnapshot(recentDocsQuery, callback);
};
