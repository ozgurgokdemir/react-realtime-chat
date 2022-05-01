import {
	getFirestore,
	collection,
	doc as document,
	query,
	onSnapshot,
	serverTimestamp,
	orderBy,
	limit,
	addDoc as add,
	setDoc as set,
	getDocs as getMultiple,
	getDoc as getSingle,
} from 'firebase/firestore';

import { app } from './app';

export const db = getFirestore(app);

export const addDoc = (path, data, timestamp = 'timestamp') =>
	add(collection(db, path), { ...data, [timestamp]: serverTimestamp() });

export const setDoc = (coll, doc, data, timestamp = 'createdAt') =>
	set(document(db, coll, doc), { ...data, [timestamp]: serverTimestamp() });

export const getDocs = (path) => getMultiple(collection(db, path));

export const getDoc = (coll, doc) => getSingle(document(db, coll, doc));

export const loadDocs = (path, cstr, callback) => {
	const docData = collection(db, path);
	const orderQuery = cstr?.field ? orderBy(cstr.field, cstr.direction) : null;
	const limitQuery = cstr?.limit ? limit(cstr.limit) : null;
	const constraints = [orderQuery, limitQuery].filter(Boolean);
	const recentDocsQuery = query(docData, ...constraints);
	onSnapshot(recentDocsQuery, callback);
};

export const loadDoc = (coll, doc, cstr, callback) => {
	const docData = document(db, coll, doc);
	const orderQuery = cstr?.field ? orderBy(cstr.field, cstr.direction) : null;
	const limitQuery = cstr?.limit ? limit(cstr.limit) : null;
	const constraints = [orderQuery, limitQuery].filter(Boolean);
	const recentDocsQuery = query(docData, ...constraints);
	onSnapshot(recentDocsQuery, callback);
};
