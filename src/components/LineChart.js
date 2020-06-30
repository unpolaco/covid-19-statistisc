import { ResponsiveLine } from '@nivo/line';
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from './LineChart.module.scss';
import InputRadioCases from './Input_Radio_Cases';
import { CountryContext } from '../context/country_context';
import InputAddCountry from './Input_Add_Country';
import Button from './Button'

function LineChart() {
	const countryContext = useContext(CountryContext);
	const [selectedCountry, setCountry] = useState({});
	const [selectedCaseType, setCaseType] = useState('confirmed');
	const [textValue, setTextValue] = useState('');

	const countriesForLineChart = [countryContext.country];
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
		const assignIfPositive = (newData) => {
      return newData > 0 ? newData : 0;
		}
		const newCases = d.results.map((el, index) => {
			if (index > 0) {
				d.results[index].newConfirmed = assignIfPositive(d.results[index].confirmed - d.results[index - 1].confirmed) 
				d.results[index].newDeaths = assignIfPositive(d.results[index].deaths - d.results[index - 1].deaths)
				d.results[index].newRecovered = assignIfPositive(d.results[index].recovered - d.results[index - 1].recovered)
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
	function onChangeCaseType(selectedCaseType) {
		setCaseType(selectedCaseType);
	}
	const onFilterCountryList = (textInput) => {
		setTextValue(textInput);
	};
	const onClickCountryList = (e) => {
		const newSelectedCountry = selectedCountry;
		newSelectedCountry[e.target.innerText] = false;
		setCountry(newSelectedCountry);
	};
	const handleResetCountries = () => {
		const initialState = {}
		setCountry({...initialState})
	}
	return (
		<section className={styles.wrapper}>
			<InputRadioCases onChangeCaseType={onChangeCaseType} />
			<div className={styles.chart_container}>
				<ResponsiveLine
					data={dataForLineChart}
					margin={{ top: 50, right: 150, bottom: 50, left: 50 }}
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
					enableSlices={'x'}
					enableGridX={false}
					enablePoints={false}
					enableGridY={false}
					colors={{ scheme: 'nivo' }}
					useMesh={true}
					legends={[
						{
							anchor: 'bottom-right',
							direction: 'column',
							justify: false,
							translateX: 100,
							translateY: 0,
							itemsSpacing: 0,
							itemDirection: 'left-to-right',
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: 'circle',
							symbolBorderColor: 'rgba(0, 0, 0, .5)',
							effects: [
								{
									on: 'hover',
									style: {
										itemBackground: 'rgba(0, 0, 0, .03)',
										itemOpacity: 1,
									},
								},
							],
						},
					]}
				/>
			</div>
			<Button 
				handleClick={handleResetCountries}
				name= "reset countries" 
			/>
			<p>compare with:</p>
			<InputAddCountry
				onFilterCountryList={onFilterCountryList}
				onClickCountryList={onClickCountryList}
				textValue={textValue}
			/>

		</section>
	);
}
export default LineChart;
