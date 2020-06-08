import { ResponsiveLine } from '@nivo/line';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from './LineChart.module.scss';

function LineChart() {
	const [mainCountry, setMainCountry] = useState('Poland')
	const [selectedCountry, setCountry] = useState({
		France: false,
		Spain: false,
		Italy: false
	})

	const countriesForLineChart = [ mainCountry ]
	countriesForLineChart.push(...Object.keys(selectedCountry)) 

	const getLineChartData = gql`
	query countries($countriesNames: [String]!)
	{countries(names: $countriesNames) {
		name
		results {
			date
			confirmed
			deaths
			recovered
		}
	}}
	`;
	
	const { data, loading, error } = useQuery(getLineChartData, {variables: {countriesNames: countriesForLineChart}})
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	const dataForLineChart = data.countries.map( d => {
		const values = d.results.map(value => ({x: value.date, y: value.confirmed}))
		return {id : d.name, data: values}
	})

	function handleClick(e) {
		const newCountry = e.target.value;
		if (!(newCountry in selectedCountry)) {
			setCountry(newCountry);
			selectedCountry[newCountry] = true;
		} else {
			setCountry(newCountry)
		}
		
		console.log('This country is already on the chart!');
	}
	const buttons = []
				for(let [key, value] of Object.entries(selectedCountry)) {	
				buttons.push(<button onClick={handleClick} key={key + "linechartButton"} value={key} visible={value}>
				{key}
			</button>)	
				}

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.button_container}>
				{buttons}
				</div>
				<div className={styles.chart_container}>
					<ResponsiveLine
						data={dataForLineChart}
						margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
						xScale={{ type: 'point' }}
						yScale={{
							type: 'linear',
							min: 'auto',
							max: 'auto',
							stacked: false,
							reverse: false,
						}}
						curve='catmullRom'
						axisTop={null}
						axisRight={null}
						axisBottom={{
							orient: 'bottom',
							renderTick: (tick) => {
								if (tick.tickIndex % 3) {
									return '';
								} else {
									return (
										<g
											transform={`translate(${tick.x},${tick.y + 50}) rotate(${
												tick.rotate
											})`}
										>
											<text style={{ fontSize: 12 }}>{tick.value}</text>
										</g>
									);
								}
							},
							tickSize: 5,
							tickPadding: 5,
							tickRotation: -45,
							legendOffset: 36,
							legendPosition: 'middle',
						}}
						axisLeft={{
							orient: 'left',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legendOffset: -40,
							legendPosition: 'middle',
						}}
						enableGridX={false}
						enableGridY={false}
						colors={{ scheme: 'nivo' }}
						pointSize={2}
						pointColor={{ theme: 'background' }}
						pointBorderWidth={2}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabel='y'
						pointLabelYOffset={-12}
						useMesh={true}
					/>
				</div>
			</div>
		</>
	);
}
export default LineChart;
