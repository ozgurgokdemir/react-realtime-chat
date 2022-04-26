import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { app } from './app';

export const storage = getStorage(app);

export const uploadFile = async (file, path) => {
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, file);
	return await getDownloadURL(storageRef);
};
