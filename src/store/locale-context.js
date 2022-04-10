import { createContext, useState, useEffect } from 'react';

export const LocaleContext = createContext({ language: '' });

const LocaleProvider = ({ children }) => {
	const [language, setLanguage] = useState('en');

	const fallback = 'en';

	useEffect(() => {
		let language = localStorage.getItem('locale') ?? navigator.language;
		setLanguage(['tr-TR', 'tr'].includes(language) ? 'tr' : fallback);
	}, []);

	const handleChange = (language) => {
		localStorage.setItem('locale', language);
		setLanguage(language);
	};

	const localeContext = { language, setLanguage: handleChange, fallback };

	return (
		<LocaleContext.Provider value={localeContext}>
			{children}
		</LocaleContext.Provider>
	);
};

export default LocaleProvider;
