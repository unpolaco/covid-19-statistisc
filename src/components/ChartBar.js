import React, { useState, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import 'moment/locale/pl';

function ChartBar() {
	const [requestCountry, setCountry] = useState('Poland');
	const [selectedCase, setCase] = useState('confirmed');
	const countryInput = useRef(null);

	// console.log(requestCountry);
	const casesNames = [
		{ displayName: 'Confirmed', value: 'confirmed' },
		{ displayName: 'New Confirmed', value: 'newConfirmed' },
		{ displayName: 'Deaths', value: 'deaths' },
		{ displayName: 'New Deaths', value: 'newDeaths' },
		{ displayName: 'Recovered', value: 'recovered' },
		{ displayName: 'New Recovered', value: 'newRecovered' },
	];

	const getMapData = gql`
		{
			results(countries: [ "${requestCountry}" ], date: { gt: "3/20/2020" }) {
				country {
					name
				}
				date
				confirmed
				deaths
				recovered
				growthRate
			}
		}
	`;

	const { data, loading, error, refetch } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	console.log(data);

	const chartData = data.results.map((d, index) => {
		if (index > 0) {
			d.newConfirmed =
				data.results[index].confirmed - data.results[index - 1].confirmed;
			d.newDeaths = data.results[index].deaths - data.results[index - 1].deaths;
			d.newRecovered =
				data.results[index].recovered - data.results[index - 1].recovered;
		}
		return d;
	});

	function handleClickCountry() {
		setCountry(countryInput.current.value);
		refetch();
	}

	function handleClickCases(e) {
		setCase(e.target.value);
	}

	return (
		<>
			<input id='country' ref={countryInput}></input>
			<label htmlFor='country'>Country name</label>
			<button type='submit' htmlFor='country' onClick={handleClickCountry}>
				Search
			</button>

			{casesNames.map((el) => (
				<button onClick={handleClickCases} 
								value={el.value} 
								key={el.value}>
					{el.displayName}
				</button>
			))}

			<ResponsiveBar
				data={chartData}
				width={1000}
				height={500}
				keys={[selectedCase]}
				indexBy='date'
				margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
				padding={0.3}
				groupMode='grouped'
				minValue={0}
				colors={{ scheme: 'category10' }}
				borderColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: -45,
					legendPosition: 'middle',
					legendOffset: 32,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendPosition: 'middle',
					legendOffset: -40,
				}}
				labelSkipWidth={15}
				labelSkipHeight={15}
				labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 120,
						translateY: 0,
						itemsSpacing: 2,
						itemWidth: 100,
						itemHeight: 20,
						itemDirection: 'left-to-right',
						itemOpacity: 0.85,
						symbolSize: 20,
						effects: [
							{
								on: 'hover',
								style: {
									itemOpacity: 1,
								},
							},
						],
					},
				]}
				animate={true}
				motionStiffness={115}
				motionDamping={15}
			/>
		</>
	);
}
export default ChartBar;
