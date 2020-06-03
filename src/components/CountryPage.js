import React from 'react';
import styles from './CountryPage.module.scss';
import ChartBar from './ChartBar';
import TextValues from './TextValues';

export default function CountryPage() {
	return (
		<section id='countryPage' className={styles.section_wrapper}>
			<div className={styles.values_wrapper}>
				<TextValues name='confirmed' />
				<TextValues name='deaths' />
				<TextValues name='recovered' />
			</div>
				<ChartBar />
		</section>
	);
}
