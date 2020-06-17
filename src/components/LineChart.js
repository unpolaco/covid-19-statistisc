import { ResponsiveLine } from '@nivo/line';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from './LineChart.module.scss';
// import casesNames from '../assets/cases_names';
import InputRadioCases from './Input_Radio_Cases'

function LineChart() {
	const [mainCountry, setMainCountry] = useState('Poland');
	const [selectedCountry, setCountry] = useState({
		France: false,
		Spain: false,
		Italy: false,
		Germany: false,
		Sweden: false,
	});
	const [selectedCaseType, setCaseType] = useState('confirmed')

	const countriesForLineChart = [mainCountry];
	countriesForLineChart.push(...Object.keys(selectedCountry));

	const getLineChartData = gql`
		query countries($countriesNames: [String]!) {
			countries(names: $countriesNames) {
				name
				results {
					date
					confirmed
					deaths
					recovered
				}
			}
		}
	`;

	const { data, loading, error } = useQuery(getLineChartData, {
		variables: { countriesNames: countriesForLineChart },
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	const dataWithNewCases = data.countries.map((d, index) => {
		const addNewCases = d.results.map((el, index) => {
			if (index > 0) {
				d.results[index].newConfirmed =
					d.results[index].confirmed - d.results[index - 1].confirmed < 0
						? 0
						: d.results[index].confirmed - d.results[index - 1].confirmed;
				d.results[index].newDeaths =
					d.results[index].deaths - d.results[index - 1].deaths < 0
						? 0
						: d.results[index].deaths - d.results[index - 1].deaths;
				d.results[index].newRecovered =
					d.results[index].recovered - d.results[index - 1].recovered < 0
						? 0
						: d.results[index].recovered - d.results[index - 1].recovered;
			} else if (index === 0) {
				d.results[index].newConfirmed = 0;
				d.results[index].newDeaths = 0;
				d.results[index].newRecovered = 0;
			}
		});
		return d;
	});
	const dataForLineChart = data.countries.map((d) => {
		
		const values = d.results.map((value) => ({
			x: value.date,
			y: value[selectedCaseType],
		}));
		return { id: d.name, data: values };
	});

	console.log(dataForLineChart);

	function handleClick(e) {
		const newCountry = e.target.value;
		const temporarySelectedCountry = selectedCountry;
		temporarySelectedCountry[newCountry] = !temporarySelectedCountry[newCountry];
		console.log(temporarySelectedCountry)
		setCountry(temporarySelectedCountry);
		if (!(newCountry in selectedCountry)) {
			temporarySelectedCountry[newCountry] = true;
			setCountry(temporarySelectedCountry);
			// selectedCountry[newCountry] = true;
		} else {
			// setCountry(newCountry);
		}
		console.log('This country is already on the chart!');
	}

	function onChangeCaseType(selectedCaseType) {
		setCaseType(selectedCaseType);
	}

	const buttons = [];
	for (let [key, value] of Object.entries(selectedCountry)) {
		buttons.push(
			<button
				className={styles.country_btn}
				onClick={handleClick}
				key={key + 'linechartButton'}
				value={key}
				visible={value}
			>
				{key}
			</button>
		);
	}

	return (
		<>
			<section className={styles.wrapper}>
					<InputRadioCases
						onChangeCaseType={onChangeCaseType}
					/>
				<div className={styles.button_container}>{buttons}</div>
				<div className={styles.chart_container}>


					<ResponsiveLine
						data={dataForLineChart}
						margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
							if (tick.tickIndex % 5) {
								return '';
							} else {
								return (
									<g transform={`translate(${tick.x},${tick.y + 50}) rotate(${tick.rotate})`}>
										<text style={{fontSize: 12}}>
											{tick.value}
										</text>
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
						enableSlices={'x'}
						enableGridX={false}
						enablePoints={false}
						enableGridY={false}
						colors={{ scheme: 'nivo' }}
						useMesh={true}
					/>
				</div>
			</section>
		</>
	);
}
export default LineChart;
