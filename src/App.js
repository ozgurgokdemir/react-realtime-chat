import { Fragment } from 'react';
import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Content from './components/layout/Content';

const App = () => {
	return (
    <Fragment>
      <Navigation />
      <Header />
      <Content />
    </Fragment>
	);
};

export default App;
