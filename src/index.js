import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import MediaProvider from './store/media-context';
import LocaleProvider from './store/locale-context';
import theme from './theme';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<StrictMode>
    <MediaProvider>
      <ChakraProvider theme={theme}>
        <LocaleProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocaleProvider>
      </ChakraProvider>
    </MediaProvider>
	</StrictMode>
);
