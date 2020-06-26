import React, { useContext, useRef, useEffect } from 'react';
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
			d['new confirmed'] =
				data.results[index].confirmed - data.results[index - 1].confirmed;
			d['new deaths'] =
				data.results[index].deaths - data.results[index - 1].deaths;
			d['new recovered'] =
				data.results[index].recovered - data.results[index - 1].recovered;
		}
		return d;
	});
	const lastData = countryData[countryData.length - 1];
	lastData['death rate'] = `${((lastData.deaths/lastData.confirmed)*100).toFixed(1)}%`;
	return (
		<section id='countryPage' className={styles.section_wrapper}>
			<HeaderCountry className={styles.header} />
			<p className={styles.country_name}>{countryContext.country}</p>
			<div className={styles.vertical_line}></div>
			<div className={styles.all_values_wrapper}>
				<div className={styles.values_cases_wrapper}>
					<div className={styles.values_type_wrapper}>
						<TextValues
							caseName='confirmed'
							caseType='total'
							name='total confirmed'
							value={lastData.confirmed}
						/>
						<TextValues
							caseName='confirmed'
							caseType='new'
							name='new confirmed'
							value={lastData['new confirmed']}
						/>
					</div>
					<div className={styles.values_type_wrapper}>
						<TextValues
							caseName='deaths'
							caseType='total'
							name='total deaths'
							value={lastData.deaths}
						/>
						<TextValues
							caseName='deaths'
							caseType='new'
							name='new deaths'
							value={lastData['new deaths']}
						/>
					</div>
					<div className={styles.values_type_wrapper}>
						<TextValues
							caseName='recovered'
							caseType='total'
							name='total recovered'
							value={lastData.recovered}
						/>
						<TextValues
							caseName='recovered'
							caseType='new'
							name='new recovered'
							value={lastData['new recovered']}
						/>
					</div>
				</div>
				<TextValues
					caseType='update'
					// name='last update: '
					name={lastData.date}
				/>
				<TextValues
					caseType='rate'
					name='death rate'
					value={lastData['death rate']}
				/>
			</div>
			<section className={styles.section_01}></section>
			<ChartBar chartData={countryData} />
			<LineChart />
		</section>
	);
}
