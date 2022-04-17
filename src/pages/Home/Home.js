import { useNavigate } from 'react-router-dom';
import { Stack, Button } from '@chakra-ui/react';
// import useLocalization from '../../hooks/use-localization';

const Home = () => {
	// const translations = {
	// 	en: {
	// 		title: 'Home Page',
	// 	},
	// 	tr: {
	// 		title: 'Ana Sayfa',
	// 	},
	// };
	// const { t } = useLocalization(translations);

  const navigate = useNavigate();

	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12'>
      <Stack textAlign='center' width='100%' direction='column' spacing={4}>
        <h1 className='text-4xl font-bold'>Welcome to Chat</h1>
        <p className='opacity-70'>Join us and chat with your friends!</p>
      </Stack>
			<Stack width='100%' direction='column' spacing={4}>
				<Button onClick={navigate.bind(null, '/register')} isFullWidth={true} colorScheme='blue' variant='solid'>
					Register
				</Button>
				<Button onClick={navigate.bind(null, '/login')} isFullWidth={true} colorScheme='blue' variant='outline'>
					Login
				</Button>
			</Stack>
		</div>
	);
};

export default Home;
