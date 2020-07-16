import { ResponsiveLine } from '@nivo/line';
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CountryContext } from '../../context/country_context';
import styles from './chart_line.module.scss';
import InputAddCountry from '../inputs/text/input_add_country';
import Button from '../buttons/button'
import InputCases from '../inputs/radio/input_cases';
import { allCases, allCasesLabels } from '../../assets/cases_names';

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
			<p className={styles.section_title}>compare {countryContext.country} with other countries</p>
			<InputCases 
				onChangeCaseType={onChangeCaseType} 
				cases={allCases}
				casesLabels={allCasesLabels}	
				/>
			<div className={styles.chart_container}>
				<ResponsiveLine
					data={dataForLineChart}
					margin={{ top: 50, right: 0, bottom: 50, left: 50 }}
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
						tickSize: 5,
						tickPadding: 5,
						tickRotation: -45,
						legendPosition: 'middle',
						legendOffset: 32,
						renderTick: (tick) => {
							if (tick.tickIndex % 10) {
								return '';
							} else {
								return (
									<g
										transform={`translate(${tick.x - 10},${tick.y + 22}) rotate(${
											tick.rotate
										})`}
									>
										<text style={{ fontSize: 10 }}>{tick.value.slice(5, 9)}</text>
									</g>
								);
							}
						},
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
					colors={{ scheme: 'category10' }}
					useMesh={true}
					legends={[
						{
							anchor: 'bottom',
							direction: 'row',
							justify: false,
							translateY: 50,
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
			<div 
			className={styles.buttons_wrapper} >
			<div 
			className={styles.input_wrapper} >
			<p className={styles.label}>compare with</p>
			<InputAddCountry
				onFilterCountryList={onFilterCountryList}
				onClickCountryList={onClickCountryList}
				textValue={textValue}
			/>
			</div>
			<Button 
				secondary={true}
				handleClick={handleResetCountries}
				name= "reset" 
			/>
			</div>
		</section>
	);
}
export default LineChart;
