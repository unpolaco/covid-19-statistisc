import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {CountryContextProvider} from './context/country_context'
import ScrollToTop from './assets/scroll_to_top'
import CountryPage from './components/pages/page_country';
import GlobalPage from './components/pages/page_global';
import styles from './App.module.scss';

function App() {
	return (
		<CountryContextProvider>
		<div className={styles.app}>
			<Router basename={process.env.PUBLIC_URL}>
			<ScrollToTop />
				<Switch>
					<Route exact path='/' component={GlobalPage} />
					<Route path='/countryPage' component={CountryPage} />
				</Switch>
			</Router>
		</div>
		</CountryContextProvider>
	);
}

export default App;
