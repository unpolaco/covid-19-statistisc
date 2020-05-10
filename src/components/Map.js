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

function MyResponsiveChoropleth() {
	const [requestCasesType, setCasesType] = useState('confirmed');
	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	// console.log(data);

	const mapData = data.results.map((d) => {
		return { value: d[requestCasesType], id: d.country.name };
	});
	return (
		<>
			<p>{requestCasesType}</p>
			<Button handleClick={() => setCasesType('confirmed')} text='confirmed' />
			<Button handleClick={() => setCasesType('deaths')} text='deaths' />
			<Button handleClick={() => setCasesType('recovered')} text='recovered' />

			<ResponsiveChoropleth
				data={mapData}
				width={1000}
				height={700}
				features={countries.features}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				colors='YlOrBr'
				domain={[0, 250000]}
				unknownColor='#e9e9e9'
				label='data.id'
				valueFormat='.2s'
				projectionType='naturalEarth1'
				projectionTranslation={[0.5, 0.5]}
				projectionRotation={[0, 0, 0]}
				projectionScale={277}
				enableGraticule={true}
				graticuleLineColor='#dddddd'
				borderWidth={1}
				borderColor='#283a44'
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
