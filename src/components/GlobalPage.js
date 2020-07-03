import React, { useEffect } from 'react';
import gsap from 'gsap';
import Map from './Map';
import SummaryTable from './SummaryTable';
import TextValues from './TextValues';
import styles from './GlobalPage.module.scss';
import Header from './Header';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const getGlobalData = gql`
{
	countries(names:[]) {
		name
		mostRecent
		 {	
			date
			confirmed
			deaths
			recovered
		}
	}
}
`;

export default function GlobalPage() {
	const covidText = React.createRef();
	const whoText = React.createRef();
	const confirmedValue = React.createRef();

	const { data, loading, error } = useQuery(getGlobalData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	
	let globalConfirmed = 0
	let globalDeaths = 0
	let globalRecovered = 0
	const lastData = data.countries[0].mostRecent.date;
	data.countries.map(el => {
		globalConfirmed += el.mostRecent.confirmed
		globalDeaths += el.mostRecent.deaths
		globalRecovered += el.mostRecent.recovered
	})

	return (
		<div id='top' className={styles.globalWrapper}>
		 <Header name='global' className={styles.header} />
			<section className={styles.section_main}>
				<div className={styles.intro_wrapper}>
						<h1 className={styles.covid_text}>
							COVID-19
						</h1>
					<div className={styles.intro_wrapper_text}>
						<p className={styles.quote1}>,,</p>
						<p ref={whoText} className={`${styles.who_text} fadeIn`}>
							Coronaviruses (CoV) are a large family of viruses that cause
							illness ranging from the common cold to more severe diseases. A
							novel coronavirus (nCoV) was identified on 7 January 2020 and was
							temporarily named “2019-nCoV”. It was subsequently named the
							“COVID-19 virus”. WHO announced COVID-19 outbreak as a pandemic on
							11 March 2020.
						</p>
						<p className={styles.quote2}>,,</p>
					</div>
				</div>
				<div className={styles.values_wrapper}>
					<TextValues
							caseName='confirmed'
							caseType='total'
							name='total confirmed'
							value={globalConfirmed}
						/>
					<TextValues
							caseName='deaths'
							caseType='total'
							name='total deaths'
							value={globalDeaths}
						/>
					<TextValues
							caseName='recovered'
							caseType='total'
							name='total recovered'
							value={globalRecovered}
						/>
				</div>
				<div className={styles.last_update}>
				<TextValues
					caseType='update'
					name={lastData}
				/>
				</div>
			</section>
			<p className={styles.section_title}>world map</p>
			<Map data={data}/>
			<p className={styles.section_title}>all cases table</p>
			<SummaryTable/>
		</div>
	);
}
