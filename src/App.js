import { Fragment } from 'react';

import { useAuth } from './store/auth-context';

import Header from './layout/Header/Header';
import Navbar from './layout/Navbar/Navbar';
import Content from './layout/Content/Content';

const App = () => {
  const { user } = useAuth();
	return (
    <Fragment>
      {user && <Header />}
      {user && <Navbar />}
      <Content />
    </Fragment>
	);
};

export default App;
