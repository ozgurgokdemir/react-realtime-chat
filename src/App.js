import { useContext } from 'react';
import {
	Button,
	Box,
	Image,
	Badge,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { StarIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { LocaleContext } from './store/locale-context';
import useLocalization from './hooks/use-localization';

const App = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const innerText = {
		en: {
			button: (mode) => `Set to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`,
		},
		tr: {
			button: (mode) => `${mode === 'dark' ? 'Açık' : 'Koyu'} Tema'ya Geç`,
		},
	};
  const { t } = useLocalization(innerText);

	return (
		<section className='container h-screen flex mx-auto px-6 py-12'>
			<div className='w-1/2 grid place-items-center'>
				<AirbnbExample />
			</div>
			<div className='w-1/2 flex items-center justify-center gap-6'>
				<LocaleSelect />
				<Button onClick={toggleColorMode} colorScheme='teal' variant='solid'>
          {t('button', colorMode)}
				</Button>
			</div>
		</section>
	);
};

function AirbnbExample() {
	const { language } = useContext(LocaleContext);
	const property = {
		imageUrl: 'https://bit.ly/2Z4KKcF',
		imageAlt: 'Rear view of modern home with pool',
		beds: 3,
		baths: 2,
		title: 'Modern home in city center in the heart of historic Los Angeles',
		formattedPrice: '$1,900.00',
		reviewCount: 34,
		rating: 4,
	};
	if (language === 'tr') {
		property.imageAlt = 'Havuzlu modern evin arka görünümü';
		property.title =
			"Tarihi Los Angeles'ın kalbinde şehir merkezinde modern ev";
	}

	return (
		<Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
			<Image src={property.imageUrl} alt={property.imageAlt} />

			<Box p='6'>
				<Box display='flex' alignItems='baseline'>
					<Badge borderRadius='full' px='2' colorScheme='teal'>
						{language === 'tr' ? 'Yeni' : 'New'}
					</Badge>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						ml='2'
					>
						{language === 'tr'
							? `${property.beds} yatak ${String.fromCharCode(0x2022)} ${
									property.baths
							  } banyo`
							: `${property.beds} beds ${String.fromCharCode(0x2022)} ${
									property.baths
							  } baths`}
					</Box>
				</Box>

				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					isTruncated
				>
					{property.title}
				</Box>

				<Box>
					{property.formattedPrice}
					<Box as='span' color='gray.600' fontSize='sm'>
						/ {language === 'tr' ? 'hafta' : 'wk'}
					</Box>
				</Box>

				<Box display='flex' mt='2' alignItems='center'>
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < property.rating ? 'teal.500' : 'gray.300'}
							/>
						))}
					<Box as='span' ml='2' color='gray.600' fontSize='sm'>
						{property.reviewCount} {language === 'tr' ? 'inceleme' : 'reviews'}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

function LocaleSelect() {
	const { language, setLanguage } = useContext(LocaleContext);

	const localeCodes = { English: 'en', Türkçe: 'tr' };

	const handleClick = (language) => setLanguage(language);

	return (
		<Menu>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
				{Object.keys(localeCodes).find((key) => localeCodes[key] === language)}
			</MenuButton>
			<MenuList>
				{Object.keys(localeCodes).map((key) => (
					<MenuItem
						key={key}
						isDisabled={language === localeCodes[key]}
						onClick={handleClick.bind(null, localeCodes[key])}
					>
						{key}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}

export default App;
