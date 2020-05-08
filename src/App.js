import React from 'react';
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



	return (
		<div className='App'>
		</div>
	);
}

export default App;
