import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import gsap from 'gsap';
import Map from '../nivo_charts/map';
import SummaryTable from '../table/table';
import TextValues from '../texts/text_values';
import styles from './page_global.module.scss';
import Header from '../header/header';
import useWindowDimensions from '../../assets/use_window_dimension';
import VirusAnimation from '../background/virus_animation'

const getGlobalData = gql`
	{
		countries(names: []) {
			name
			mostRecent {
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
	const quote1 = React.createRef();
	const quote2 = React.createRef();
	const confirmedValue = React.createRef();
	const deathsValue = React.createRef();
	const recoveredValue = React.createRef();
	const lastUpdate = React.createRef();
	const startSection = React.createRef();
	const mapSection = React.createRef();
	const tableSection = React.createRef();
	const { height, width } = useWindowDimensions();

	useEffect(() => {
		const tlMainFadeOut = gsap.timeline({
			scrollTrigger: {
				trigger: startSection.current,
				start: '+=70% center',
				end: 'center top',
				toggleActions: 'play reverse play reverse',
				scrub: true,
			},
		});
		const tlMap = gsap.timeline({
			scrollTrigger: {
				trigger: mapSection.current,
				start: 'top center',
				end: 'center top',
				toggleActions: 'play reverse play reverse',
			},
		});
		const tlTable = gsap.timeline({
			scrollTrigger: {
				trigger: tableSection.current,
				start: 'top center',
				end: 'center top',
				toggleActions: 'play reverse play reverse',
			},
		});

		tlMainFadeOut.to(quote1.current, { opacity: 0, duration: 0.2 });
		tlMainFadeOut.to(quote2.current, { opacity: 0, duration: 0.2 });
		tlMainFadeOut.to(whoText.current, { opacity: 0, duration: 0.3 });
		tlMainFadeOut.to(lastUpdate.current, { opacity: 0, duration: 0.5 });
		tlMainFadeOut.to(recoveredValue.current, { opacity: 0, duration: 0.5 });
		tlMainFadeOut.to(deathsValue.current, { opacity: 0, duration: 0.5 });
		tlMainFadeOut.to(confirmedValue.current, { opacity: 0, duration: 0.5 });
		tlMap.from(mapSection.current, { scale: 0.98, opacity: 0, duration: 0.4 });
		tlTable.from(tableSection.current, {
			scale: 0.98,
			opacity: 0,
			duration: 0.4,
		});
	}, [
		covidText,
		whoText,
		confirmedValue,
		startSection,
		mapSection,
		tableSection,
	]);

	const { data, loading, error } = useQuery(getGlobalData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	let globalConfirmed = 0;
	let globalDeaths = 0;
	let globalRecovered = 0;
	const lastData = data.countries[0].mostRecent.date;
	data.countries.map((el) => {
		globalConfirmed += el.mostRecent.confirmed;
		globalDeaths += el.mostRecent.deaths;
		globalRecovered += el.mostRecent.recovered;
	});

	return (
		<div id='top' className={styles.page_global_wrapper}>
			<Header name='global' className={styles.header} />
			<section ref={startSection} className={styles.section_wrapper}>
				<div className={styles.intro_wrapper}>
					<h1 ref={covidText} className={styles.covid_text}>
						COVID-19
					</h1>
					<div className={styles.intro_wrapper_text}>
						<p ref={quote1} className={styles.quote1}>
							,,
						</p>
						<p ref={whoText} className={`${styles.who_text} fadeIn`}>
							Coronaviruses (CoV) are a large family of viruses that cause
							illness ranging from the common cold to more severe diseases. A
							novel coronavirus (nCoV) was identified on 7 January 2020 and was
							temporarily named “2019-nCoV”. It was subsequently named the
							“COVID-19 virus”. WHO announced COVID-19 outbreak as a pandemic on
							11 March 2020.
						</p>
						<p ref={quote2} className={styles.quote2}>
							,,
						</p>
					</div>
				</div>

				<div className={styles.all_values_wrapper}>
					<div className={styles.values_cases_wrapper}>
						<div ref={confirmedValue} className={styles.values_type_wrapper}>
							<TextValues
								caseName='confirmed'
								caseType='total'
								name='total confirmed'
								value={globalConfirmed}
							/>
						</div>
						<div ref={deathsValue} className={styles.values_type_wrapper}>
							<TextValues
								caseName='deaths'
								caseType='total'
								name='total deaths'
								value={globalDeaths}
							/>
						</div>
						<div ref={recoveredValue} className={styles.values_type_wrapper}>
							<TextValues
								caseName='recovered'
								caseType='total'
								name='total recovered'
								value={globalRecovered}
							/>
						</div>
					</div>
					<div ref={lastUpdate} className={styles.last_update}>
						<TextValues caseType='update' name={lastData} />
					</div>
				</div>
			</section>
			<section ref={mapSection} className={styles.section_wrapper_transparent}>
				<Map 
					data={data} 
					width={width}/>
			</section>
			<section
				ref={tableSection}
				className={styles.section_wrapper_transparent}
			>
				<SummaryTable />
			</section>
				<VirusAnimation width={width} height={height}/>
				<VirusAnimation width={width} height={height}/>
				<VirusAnimation width={width} height={height}/>
				<VirusAnimation width={width} height={height}/>
				<VirusAnimation width={width} height={height}/>
		</div>
	);
}
