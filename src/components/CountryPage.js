import React, { useContext } from 'react';
import styles from './CountryPage.module.scss';
import ChartBar from './ChartBar';
import LineChart from './LineChart'
import TextValues from './TextValues';
import HeaderCountry from './Header_Country';
import { CountryContext } from '../context/country_context'
export default function CountryPage() {

const x = useContext(CountryContext)

	return (
		<section id='countryPage' className={styles.section_wrapper}>
		<HeaderCountry className={styles.header} />
					<p className={styles.country_name}>{x.country}</p>
					<div className={styles.vertical_line}></div>
		
			<div className={styles.values_wrapper}>
				<TextValues name='confirmed' />
				<TextValues name='deaths' />
				<TextValues name='recovered' />
			</div>
				<section 
					className={styles.section_01}>
				</section>
				<ChartBar />
				<LineChart />
		</section>
	);
}
