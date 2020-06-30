import React, { useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import gsap, { TweenMax, Power3 } from 'gsap';
import Map from './Map';
import SummaryTable from './SummaryTable';
import TextValues from './TextValues';
import styles from './GlobalPage.module.scss';
import HeaderGlobal from './Header_Global';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const getMapData = gql`
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
	let covidText = useRef(null);
	let whoText = useRef(null);
	let confirmedValue = useRef(null)

// 	useEffect(() => {
// 		gsap.from([confirmedValue], 0.8, {
// 			delay: 2,
// 			ease: "power3.out",
// 			y: 64,
// 			stagger: { amount: 0.15 }
// })
// 	}, [confirmedValue])

	// useEffect(() => {
	// 	TweenMax.to(
	// 		covidText, 1, {
	// 			opacity: 1,
	// 			y: -50,
	// 			ease: Power3.easeOut}
	// 	)
	// }, []);
	// const intersection = useIntersection(whoText, {
	// 	root: null,
	// 	rootMargin: '-150px',
	// 	threshold: 1,
	// })

	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	console.log("data", data);
	
	
	let globalConfirmed = 0
	let globalDeaths = 0
	let globalRecovered = 0
	let lastData = data.countries[0].mostRecent.date;
	const globalData = data.countries.map(el => {
		globalConfirmed = globalConfirmed + el.mostRecent.confirmed
		globalDeaths = globalDeaths + el.mostRecent.deaths
		globalRecovered = globalRecovered + el.mostRecent.recovered
	})
	// const fadeIn = (element) => {
	// 	gsap.to(element, 1, {
	// 		opacity: 1,
	// 		y: -60,
	// 		ease: 'power4.out',
	// 		stagger: {
	// 			amount: 0.3,
	// 		},
	// 	});
	// };
	// const fadeOut = (element) => {
	// 	gsap.to(element, 1, {
	// 		opacity: 0,
	// 		y: -20,
	// 		ease: 'power4.out',
	// 	});
	// };
	// intersection && intersection.intersectionRatio < 1 ? fadeOut('.fadeIn') : fadeIn('.fadeIn');

	return (
		<div id='top' className={styles.globalWrapper}>
		 <HeaderGlobal className={styles.header} />
			<section className={styles.section_01}>
				<div className={styles.intro_wrapper}>
						<h1 ref={(el) => (covidText = el)} className={styles.covid_text}>
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
				<div ref={el => (confirmedValue = el)} className={styles.values_wrapper}>
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
				<TextValues
					caseType='update'
					name={lastData}
				/>
			</section>
			<p className={styles.section_title}>world map</p>
			<Map data={data}/>
			<p className={styles.section_title}>all cases table</p>
			<SummaryTable/>
		</div>
	);
}
