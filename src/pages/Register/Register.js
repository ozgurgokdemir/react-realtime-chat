import { useReducer } from 'react';
import { register, updateProfile } from '../../services/firebase/auth';
import { uploadFile } from '../../services/firebase/storage';

import CreateAccount from './CreateAccount';
import CreateProfile from './CreateProfile';

const initialState = { step: 0, data: {} };

const reducer = (state, action) => {
	switch (action.type) {
		case 'NEXT':
			return { step: state.step + 1, data: { ...state.data, ...action.data } };
		case 'BACK':
			return { ...state, step: state.step - 1 };
		case 'SUBMIT':
			const submitRequest = async () => {
				const { email, password } = state.data;
				const { displayName, photo } = action.data;
				const { user } = await register(email, password);
				const path = `${user.uid}/${photo[0].name}`;
				const photoURL = await uploadFile(photo[0], path);
				return await updateProfile(displayName, photoURL);
			};
			submitRequest();
			return { ...state, data: { ...state.data, ...action.data } };
		default:
			return initialState;
	}
};

const Register = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleAction = (action) => dispatch(action);

	const steps = [
		<CreateAccount data={state.data} onAction={dispatch} />,
		<CreateProfile onAction={handleAction} />,
	];

	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12'>
			{steps[state.step]}
		</div>
	);
};

export default Register;
