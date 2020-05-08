import React from 'react';
import Map from './components/Map';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const get_test_info = gql`
{
  results(countries: [], date: { eq: "5/07/2020" }) {
    country {
      name
    }
    confirmed
    date
    deaths
    recovered
    growthRate
  }
}
`;

function App() {
  const { data, loading, error } = useQuery(get_test_info);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  
  const mapData = data.results.map((d) => {
    return { value: d.confirmed, id: d.country.name };
  });
    
    
    return (
      <div className='App'>
      <Map data={mapData} />
		</div>
	);
}

export default App;
