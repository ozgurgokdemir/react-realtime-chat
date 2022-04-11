import useLocalization from '../hooks/use-localization';

const Home = () => {
  const translations = {
		en: {
			title: 'Home Page',
		},
		tr: {
			title: 'Ana Sayfa',
		},
	};
	const { t } = useLocalization(translations);

  return (
    <div className='w-full h-[70vh] grid place-items-center'>
      <p className='text-4xl font-bold'>{t('title')}</p>
    </div>
  );
}

export default Home;