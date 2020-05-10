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

const confirmedColors = ['#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C', '#a12d0a', '#782208', '#541806']
const deathsColors = "YlOrBr"
const recoveredColors = "greens"


function MyResponsiveChoropleth() {
	const [requestCasesType, setCasesType] = useState('confirmed');
	const [maxDomainValue, setMaxDomainValue] = useState(250000)
	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	// console.log(data);

	const mapData = data.results.map((d) => {
		return { value: d[requestCasesType], id: d.country.name };
	});
	const setConfirmed = () => {
		setCasesType('confirmed')
		setMaxDomainValue(250000)
	}
	const setDeaths = () => {
		setCasesType('deaths')
		setMaxDomainValue(100000)
	}
	const setRecovered = () => {
		setCasesType('recovered')
		setMaxDomainValue(250000)
	}

	const handleInputChange = (e) => {
		setMaxDomainValue(e.target.value)
	}
	return (
		<>
			<p>{requestCasesType}</p>
			<Button handleClick={() => setConfirmed()} text='confirmed'/>
			<Button handleClick={() => setDeaths()} text='deaths' />
			<Button handleClick={() => setRecovered()} text='recovered' /> <br/>
			<input type='range' max='250000' step='1000' value={maxDomainValue} onChange={handleInputChange}/>
			<p>{maxDomainValue}</p>

			<ResponsiveChoropleth
				data={mapData}
				width={1000}
				height={500}
				features={countries.features}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				colors={requestCasesType === 'confirmed' ? confirmedColors : (requestCasesType === 'deaths' ? deathsColors : recoveredColors)}
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
				legends={[
					{
						anchor: 'bottom-left',
						direction: 'column',
						justify: false,
						translateX: 22,
						translateY: -14,
						itemsSpacing: 0,
						itemWidth: 94,
						itemHeight: 18,
						itemDirection: 'left-to-right',
						itemTextColor: '#444444',
						itemOpacity: 0.85,
						symbolShape: 'circle',
						symbolSize: 15,
						effects: [
							{
								on: 'hover',
								style: {
									itemTextColor: '#000000',
									itemOpacity: 1,
								},
							},
						],
					},
				]}
			/>
		</>
	);
}

export default MyResponsiveChoropleth;
