import { useContext } from 'react';
import { LocaleContext } from '../store/locale-context';

const useLocalization = (texts) => {
	const { language, fallback } = useContext(LocaleContext);

	const t = (key, variable = undefined) => {
		const value = (texts[language] ?? texts[fallback])[key];
		return value instanceof Function ? value(variable) : value;
	};
  
	return { t };
};

export default useLocalization;
