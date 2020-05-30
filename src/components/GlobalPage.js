import React from 'react';
import Map from './Map';
import SummaryTable from './SummaryTable';
import ChartBar from './ChartBar';
import TextValues from './TextValues';
import styles from './GlobalPage.module.scss';

export default function GlobalPage() {
	return (
		<div id='top' className={styles.globalWrapper}>
			<section id='globalPage' className={styles.section_01}>
				<h1 className={styles.covid_text}>COVID-19</h1>
				<p className={styles.quote1}>,,</p>
				<p className={styles.who_text}>
					Coronaviruses (CoV) are a large family of viruses that cause illness
					ranging from the common cold to more severe diseases. A novel
					coronavirus (nCoV) was identified on 7 January 2020 and was
					temporarily named “2019-nCoV”. It was subsequently named the “COVID-19
					virus”. WHO announced COVID-19 outbreak as a pandemic on 11 March
					2020.
				</p>
				<p className={styles.quote2}>,,</p>
				<div className={styles.values_wrapper}>
					<TextValues name='confirmed' />
					<TextValues name='deaths' />
					<TextValues name='recovered' />
				</div>
			</section>
			<Map />
			<SummaryTable />
			<ChartBar />
		</div>
	);
}
