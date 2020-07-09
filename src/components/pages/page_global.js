import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import gsap from 'gsap';
import Map from '../nivo_charts/map';
import SummaryTable from '../table/table';
import TextValues from '../texts/text_values';
import styles from './page_global.module.scss';
import Header from '../header/header';

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
	const sectionMap = React.createRef();
	const sectionTable = React.createRef();

	useEffect(() => {
		const tl = gsap.timeline();
		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.trigger',
				start: '5% 20%',
				end: '25% 40%',
				toggleActions: 'play reverse play reverse',
				scrub: true,
			},
		});
		const tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: 'sectionMap',
				start: '0% 0%',
				end: '40% 40%',
				toggleActions: 'play reverse play reverse',
				// markers: true,
			},
		});

		tl.from(covidText.current, {
			opacity: 0,
			y: 50,
			duration: 0.5,
			delay: 0.5,
			ease: 'power3.out',
		});
		tl.from(whoText.current, {
			opacity: 0,
			y: 50,
			duration: 0.5,
			ease: 'power3.out',
		});
		tl.from(
			quote1.current,
			{
				opacity: 0,
				x: 10,
				duration: 0.1,
				ease: 'power3.out',
			},
			'>-.1'
		);
		tl.from(
			quote2.current,
			{
				opacity: 0,
				x: -10,
				duration: 0.1,
				ease: 'power3.out',
			},
			'>-.1'
		);
		tl.from(
			confirmedValue.current,
			{ y: 20, opacity: 0, duration: 0.5, delay: 1.2, ease: 'power3.out' },
			'>-.3'
		);
		tl.from(
			deathsValue.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl.from(
			recoveredValue.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl.from(
			lastUpdate.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl2.to(whoText.current, { opacity: 0, duration: 0.3 }, '>-.3');
		tl2.to(quote1.current, { opacity: 0, duration: 0.2 }, '>-.3');
		tl2.to(quote2.current, { opacity: 0, duration: 0.2 }, '>-.3');
		tl2.to(lastUpdate.current, { opacity: 0, duration: 0.5 }, '>-1');
		tl2.to(confirmedValue.current, { opacity: 0, duration: 0.5 }, '>-.3');
		tl2.to(deathsValue.current, { opacity: 0, duration: 0.5 });
		tl2.to(recoveredValue.current, { opacity: 0, duration: 0.5 });
	}, [covidText, whoText, confirmedValue]);

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
			<section className={styles.section_wrapper}>
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
			<section ref={sectionMap} className={styles.section_wrapper}>
				<Map data={data} />
			</section>
			<section ref={sectionTable} className={styles.section_wrapper}>
				<SummaryTable />
			</section>
		</div>
	);
}
