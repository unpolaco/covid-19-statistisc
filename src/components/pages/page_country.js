import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CountryContext } from '../../context/country_context';
import styles from './page_country.module.scss';
import ChartBar from '../nivo_charts/chart_bar';
import LineChart from '../nivo_charts/chart_line';
import TextValues from '../texts/text_values';
import Header from '../header/header';
gsap.registerPlugin(ScrollTrigger);

export default function CountryPage() {
	const countryContext = useContext(CountryContext);
	const header = React.createRef();
	const line = React.createRef();
	const titleCountryName = React.createRef();
	const textValue1 = React.createRef();
	const textValue2 = React.createRef();
	const textValue3 = React.createRef();
	const textValue4 = React.createRef();
	const chartbarSection = React.createRef();
	const linechartSection = React.createRef();
	const startSection = React.createRef();

	useEffect(() => {
		const tl = gsap.timeline();
		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: startSection.current,
				start: "+=80% center",
				end: "center top",
				toggleActions: 'play reverse play reverse',
				scrub: true,
			},
		});
		const tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: chartbarSection.current,
				start: "top center",
				end: "center top",
				toggleActions: 'play reverse play reverse',
				// markers: true,
			},
		});
		const tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: linechartSection.current,
				start: "top center",
				end: "center top",
				toggleActions: 'play reverse play reverse',
			},
		});
		tl.from(line.current, { height: 0, duration: 0.4, delay: 0.2 });
		tl.from(titleCountryName.current, {
			opacity: 0,
			x: -500,
			duration: 1,
			ease: 'power3.out',
		});
		tl.from(
			textValue1.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl.from(
			textValue2.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl.from(
			textValue3.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl.from(
			textValue4.current,
			{ y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
			'>-.3'
		);
		tl2.to(line.current, { height: 0, duration: 0.6 });
		tl2.to(
			titleCountryName.current,
			{ color: 'rgb(211, 218, 223)', duration: 2.5 },
			'>-.3'
		);
		tl2.to(textValue4.current, { opacity: 0, duration: 0.5 }, '>-1');
		tl2.to(textValue1.current, { opacity: 0, duration: 0.5 }, '>-.3');
		tl2.to(textValue2.current, { opacity: 0, duration: 0.5 }, '>-.3');
		tl2.to(textValue3.current, { opacity: 0, duration: 0.5 }, '>-.3');
		tl3.from(chartbarSection.current, { scale: .98, opacity: 0, duration: 0.4 });
		tl4.from(linechartSection.current, { scale: .98, opacity: 0, duration: 0.4 });
	}, [
		line,
		titleCountryName,
		textValue1,
		textValue2,
		textValue3,
		textValue4,
		chartbarSection,
		linechartSection,
		startSection
	]);

	const getCountryData = gql`
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
	const { data, loading, error } = useQuery(getCountryData);
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
	const lastData = countryData[countryData.length - 1];
	lastData['death rate'] = `${(
		(lastData.deaths / lastData.confirmed) *
		100
	).toFixed(1)}%`;
	return (
		<div className={styles.page_country_wrapper}>
				<Header ref={header} name='country' className={styles.header} />
			<section id='top' ref={startSection} className={styles.section_wrapper}>
				<p ref={titleCountryName} className={styles.country_name}>
					{countryContext.country}
				</p>
				<div ref={line} className={styles.vertical_line}></div>
				<div className={styles.all_values_wrapper}>
					<div className={styles.values_cases_wrapper}>
						<div ref={textValue1} className={styles.values_type_wrapper}>
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
								value={lastData.newConfirmed}
							/>
						</div>
						<div ref={textValue2} className={styles.values_type_wrapper}>
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
								value={lastData.newDeaths}
							/>
						</div>
						<div ref={textValue3} className={styles.values_type_wrapper}>
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
								value={lastData.newRecovered}
							/>
						</div>
					</div>
					<div ref={textValue4} className={styles.values_type_wrapper}>
						<TextValues
							caseType='rate'
							name='death rate'
							value={lastData['death rate']}
						/>
						<TextValues caseType='update' name={lastData.date} />
					</div>
				</div>
			</section>
			<section
				ref={chartbarSection}
				id='chart bar'
				className={styles.section_wrapper}
			>
				<ChartBar chartData={countryData} />
			</section>
			<section
				ref={linechartSection}
				id='line chart'
				className={styles.section_wrapper}
			>
				<LineChart />
			</section>
		</div>
	);
}
