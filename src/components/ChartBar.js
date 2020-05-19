import React, { useState, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import 'moment/locale/pl';
import moment from 'moment';
import countries from '../assets/world_countries.json';
import './ChartBar.css';

function ChartBar() {
	const casesNames = [
		{ displayName: 'Confirmed', value: 'confirmed' },
		{ displayName: 'New Confirmed', value: 'newConfirmed' },
		{ displayName: 'Deaths', value: 'deaths' },
		{ displayName: 'New Deaths', value: 'newDeaths' },
		{ displayName: 'Recovered', value: 'recovered' },
		{ displayName: 'New Recovered', value: 'newRecovered' },
	];
	const now = moment();
	const fromJanuary = '12/01/2019';
	const fromMarch = '03/01/2020';
	const lastMonth = now.clone().subtract(1, 'month').format('MM/DD/YYYY');

	const timeRange = [
		{ displayTime: 'from 1 January', value: fromJanuary },
		{ displayTime: 'from 1 March', value: fromMarch },
		{ displayTime: 'last month', value: lastMonth },
	];
	const countryList = [];
	const l = countries.features.length
	for (let i = 0; i < l; i++) {
		countryList.push(countries.features[i].id);
	}

	const [selectedCountry, setCountry] = useState('Poland');
	const [selectedCase, setCase] = useState('confirmed');
	const [selectedTimeRange, setTimeRange] = useState(fromMarch);

	const [textValue, setTextValue] = useState('');
	const countryInput = useRef(null);

	const getMapData = gql`
		{
			results(countries: [ "${selectedCountry}" ], date: { gt: "${selectedTimeRange}" }) {
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

	function handleClickCountry() {
		setCountry(countryInput.current.value);
		refetch();
	}

	function handleClickCases(e) {
		setCase(e.target.value);
	}

	function handleClickTimeRange(e) {
		setTimeRange(e.target.value);
	}
	function handleFilterCountryList(e) {
		setTextValue(e.target.value);
	}
	function handleClickCountryList(e) {
		setCountry(e.target.innerText);
		refetch();
	}

	return (
		<>
			<h2>{selectedCountry}</h2>
			<div className='searchWrapper'>
			<div className='inputWrapper'>
				<input
					id='country'
					onChange={handleFilterCountryList}
					ref={countryInput}
					autocomplete='off'
				></input>
				<label htmlFor='country'>Country name</label>
				<button type='submit' htmlFor='country' onClick={handleClickCountry}>
					Search
				</button>
			</div>
				<ul>
					{countryList
						.filter((name) => {
							return name.toUpperCase().includes(textValue.toUpperCase());
						})
						.map((filteredName) => (
							<li onClick={handleClickCountryList}>{filteredName}</li>
						))}
				</ul>
			</div>

			{casesNames.map((el) => (
				<button onClick={handleClickCases} value={el.value} key={el.value}>
					{el.displayName}
				</button>
			))}

			{timeRange.map((el) => (
				<form id={el.value + 'form'}>
					<input
						type='radio'
						name={timeRange}
						onClick={handleClickTimeRange}
						value={el.value}
						key={el.value}
						id={el.value}
					></input>
					<label htmlFor={el.value} key={el.value + 'label'}>
						{el.displayTime}
					</label>
				</form>
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
				animate={true}
				motionStiffness={115}
				motionDamping={15}
			/>
		</>
	);
}
export default ChartBar;
