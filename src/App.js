import { Fragment } from 'react';
import Navigation from './layout/Navigation/Navigation';
import Header from './layout/Header/Header';
import Content from './layout/Content/Content';

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
