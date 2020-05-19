import React, { useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from '../assets/world_countries.json';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from './Button';

const getMapData = gql`
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

const confirmedColors = [
	'#FBE9E7',
	'#FFCCBC',
	'#FFAB91',
	'#FF8A65',
	'#FF7043',
	'#FF5722',
	'#F4511E',
	'#E64A19',
	'#D84315',
	'#BF360C',
	'#a12d0a',
	'#782208',
	'#541806',
];
// const deathsColors = ['"YlOrBr"']
const deathsColors = [
	'#ffffff',
	'#fdefed',
	'#fadfdb',
	'#f8cfc9',
	'#f6bfb7',
	'#f3afa5',
	'#f19f93',
	'#ef8f81',
	'#ec7f6f',
	'#ea6f5d',
	'#e85f4a',
	'#e54f38',
	'#e33f26',
	'#d9351c',
	'#c7311a',
	'#b52c17',
	'#a22815',
	'#902413',
	'#7e1f10',
	'#6c1b0e',
	'#5a160c',
	'#481209',
	'#360d07',
	'#240905',
	'#120402',
];
const recoveredColors = 'greens';

function MyResponsiveChoropleth() {
	const casesList = [
		{ displayName: 'Confirmed', value: 'confirmed' },
		// { displayName: 'New Confirmed', value: 'newConfirmed' },
		{ displayName: 'Deaths', value: 'deaths' },
		// { displayName: 'New Deaths', value: 'newDeaths' },
		{ displayName: 'Recovered', value: 'recovered' },
		// { displayName: 'New Recovered', value: 'newRecovered' },
	];
	const [requestCasesType, setCasesType] = useState('confirmed');
	const [maxDomainValue, setMaxDomainValue] = useState(250000);
	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	// console.log(data);

	const mapData = data.results.map((d) => {
		return { value: d[requestCasesType], id: d.country.name };
	});

	const handleInputChange = (e) => {
		setMaxDomainValue(e.target.value);
	};
	const handleClickCaseType = (e) => {
		setCasesType(e.target.value);
		setMaxDomainValue(e.target.value === 'deaths' ? 100000 : 250000);
	};

	return (
		<>
			<p>{requestCasesType}</p>
			{casesList.map((el) => (
				<Button
					handleClick={(e) => handleClickCaseType(e)}
					value={el.value}
					name={el.displayName}
				/>
			))}
			<br />
			<input
				type='range'
				max='250000'
				step='1000'
				value={maxDomainValue}
				onChange={handleInputChange}
			/>
			<p>{maxDomainValue}</p>

			<ResponsiveChoropleth
				data={mapData}
				width={1000}
				height={500}
				features={countries.features}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				colors={
					requestCasesType === 'confirmed'
						? confirmedColors
						: requestCasesType === 'deaths'
						? deathsColors
						: recoveredColors
				}
				domain={[0, maxDomainValue]}
				unknownColor='#e9e9e9'
				valueFormat=',.0f'
				projectionType='naturalEarth1'
				projectionTranslation={[0.5, 0.5]}
				projectionRotation={[0, 0, 0]}
				projectionScale={200}
				graticuleLineColor='#dddddd'
				borderWidth={0.2}
				borderColor='#455A64'
			/>
		</>
	);
}

export default MyResponsiveChoropleth;
