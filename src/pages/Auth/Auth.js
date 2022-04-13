import useLocalization from '../../hooks/use-localization';

const Auth = () => {
	const translations = {
		en: {
			title: 'Auth Page',
		},
		tr: {
			title: 'Giriş Sayfası',
		},
	};
	const { t } = useLocalization(translations);

	return (
    <div className='w-full h-[70vh] grid place-items-center'>
      <p className='text-4xl font-bold'>{t('title')}</p>
    </div>
  );
};

export default Auth;
