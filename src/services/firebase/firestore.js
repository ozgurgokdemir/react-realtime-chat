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
	getDocs,
	getDoc,
} from 'firebase/firestore';

import { app } from './app';

export const db = getFirestore(app);

export const addDocument = (path, data, timestamp = 'timestamp') =>
	add(collection(db, path), { ...data, [timestamp]: serverTimestamp() });

export const setDocument = (coll, doc, data, timestamp = 'createdAt') =>
	set(document(db, coll, doc), { ...data, [timestamp]: serverTimestamp() });

export const getCollection = (path) => getDocs(collection(db, path));

export const getDocument = (coll, doc) => getDoc(document(db, coll, doc));

export const listenCollection = (path, constraints, callback) => {
	const collectionRef = collection(db, path);
	const collectionQuery = getQuery(collectionRef, constraints);
	return onSnapshot(collectionQuery, callback);
};

export const listenDocument = (coll, doc, constraints, callback) => {
	const documentRef = document(db, coll, doc);
	const documentQuery = getQuery(documentRef, constraints);
	return onSnapshot(documentQuery, callback);
};

function getQuery(ref, constraints) {
	if (!constraints) return query(ref);
	const { field, direction, limit: limitConstraint } = constraints;
	const orderQuery = field ? orderBy(field, direction) : null;
	const limitQuery = limitConstraint ? limit(limitConstraint) : null;
	const filteredConstraints = [orderQuery, limitQuery].filter(Boolean);
	return query(ref, ...filteredConstraints);
}
