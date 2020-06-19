import React, { useContext } from 'react';
import styles from './CountryPage.module.scss';
import ChartBar from './ChartBar';
import LineChart from './LineChart';
import TextValues from './TextValues';
import HeaderCountry from './Header_Country';
import { CountryContext } from '../context/country_context';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function CountryPage() {
	const countryContext = useContext(CountryContext);
	const getMapData = gql`
{
	results(countries: [ "${countryContext.country}" ], 
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

	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	const countryData = data.results.map((d, index) => {
		if (index > 0) {
			d.newConfirmed =
				data.results[index].confirmed - data.results[index - 1].confirmed;
			d.newDeaths = data.results[index].deaths - data.results[index - 1].deaths;
			d.newRecovered =
				data.results[index].recovered - data.results[index - 1].recovered;
		}
		return d;
	});
	console.log(countryData);
	const lastData = countryData[countryData.length - 1];

	return (
		<section id='countryPage' className={styles.section_wrapper}>
			<HeaderCountry className={styles.header} />
			<p className={styles.country_name}>{countryContext.country}</p>
			<div className={styles.vertical_line}></div>
			<div className={styles.values_wrapper}>
				<TextValues name='confirmed' value={lastData.confirmed} />
				<TextValues name='deaths' value={lastData.deaths} />
				<TextValues name='recovered' value={lastData.recovered} />
			</div>
			<section className={styles.section_01}></section>
			<ChartBar chartData={countryData} />
			<LineChart />
		</section>
	);
}
