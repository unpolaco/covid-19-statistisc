import React, { useState, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import 'moment/locale/pl';
import moment from 'moment';
import countries from '../assets/world_countries.json';
import styles from './ChartBar.module.scss';
import InputRadioTimeRange from './Input_Radio_TimeRange';
import casesNames from '../assets/cases_names'
import {timeRange, pandemicStart} from '../assets/time_range'

function ChartBar() {

	const countryList = [];
	const l = countries.features.length;
	for (let i = 0; i < l; i++) {
		countryList.push(countries.features[i].id);
	}

	const [selectedTimeRangeOption, setTimeRangeOption] = useState(pandemicStart);
	const [selectedCountry, setCountry] = useState('Poland');
	const [selectedCase, setCase] = useState('confirmed');
	const [textValue, setTextValue] = useState('');
	const countryInput = useRef(null);

	const getMapData = gql`
	{
		results(countries: [ "${selectedCountry}" ], 
		date: { gt: "01/01/2020" }) {
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
	// console.log(data);

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

	const timeFilterChartData = chartData.filter((d, index) => {
		if (moment(chartData[index].date).isAfter(moment(selectedTimeRangeOption)))
			return d;
	});

	function handleClickCountry() {
		setCountry(countryInput.current.value);
		refetch();
	}

	function handleClickCases(e) {
		setCase(e.target.value);
	}

	function handleFilterCountryList(e) {
		setTextValue(e.target.value);
	}
	function handleClickCountryList(e) {
		setCountry(e.target.innerText);
		refetch();
	}
	function onChangeTimeRange(selectedTimeRangeOption) {
		setTimeRangeOption(selectedTimeRangeOption);
	}

	return (
		<section id='chartBar' className={styles.section_wrapper}>
			<p className={styles.country_name}>{selectedCountry}</p>
			<div className={styles.vertical_line}></div>
			<div className={styles.search_wrapper}>
				<div className={styles.input_wrapper}>
					<input
						id='country'
						onChange={handleFilterCountryList}
						ref={countryInput}
						autoComplete='off'
					></input>
					<label htmlFor='country'>Country name</label>
					<button type='submit' htmlFor='country' onClick={handleClickCountry}>
						Search
					</button>
				</div>
				<ul className={styles.country_list}>
					{countryList
						.filter((name) => {
							return name.toUpperCase().includes(textValue.toUpperCase());
						})
						.map((filteredName) => (
							<li
								onClick={handleClickCountryList}
								key={filteredName + 'countryList'}
							>
								{filteredName}
							</li>
						))}
				</ul>
			</div>

			<div className={styles.cases_container}>
				{casesNames.map((el) => (
					<button
						onClick={handleClickCases}
						value={el.value}
						key={el.value + 'casesNames'}
					>
						{el.displayName}
					</button>
				))}
			</div>

			<div className={styles.chartbar_container}>
				<ResponsiveBar
					data={timeFilterChartData}
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
					animate={true}
					motionStiffness={115}
					motionDamping={15}
				/>
			</div>
			<InputRadioTimeRange
				onChangeTimeRange={onChangeTimeRange}
				timeRange={timeRange}
			/>
		</section>
	);
}
export default ChartBar;
