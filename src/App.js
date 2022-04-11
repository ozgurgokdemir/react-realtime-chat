import { Fragment } from 'react';
import Navigation from './components/layout/Navigation';
import Content from './components/layout/Content';

const App = () => {
	return (
    <Fragment>
      <Navigation />
      <Content />
    </Fragment>
	);
};

export default App;
