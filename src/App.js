import React from 'react';
import Nav from './components/Nav';
import CountryPage from './components/CountryPage';
import GlobalPage from './components/GlobalPage';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Nav className='nav' />
				<Switch>
					<Route path='/globalPage' component={GlobalPage} />
					<Route path='/countryPage' component={CountryPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
