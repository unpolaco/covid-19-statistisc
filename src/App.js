import React from 'react';
import Map from './components/Map';
import SummaryTable from './components/SummaryTable'
import ChartBar from './components/ChartBar';
import './App.css';

function App() {
    return (
      <div className='App'>
        <Map/>
        <SummaryTable/>
			  <ChartBar/>
		  </div>
	);
}

export default App;
