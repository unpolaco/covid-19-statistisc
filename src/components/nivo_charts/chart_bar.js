import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import 'moment/locale/pl';
import moment from 'moment';
import styles from './chart_bar.module.scss';
import InputRadioTimeRange from '../inputs/radio/input_time_range';
import { pandemicStart } from '../../assets/time_range';
import InputCases from '../inputs/radio/input_cases';
import { allCases, allCasesLabels } from '../../assets/cases_names';

function ChartBar({ chartData }) {
	const [selectedTimeRangeOption, setTimeRangeOption] = useState(pandemicStart);
	const [selectedCaseType, setCaseType] = useState('confirmed');

	const timeFilterChartData = chartData.filter((d, index) => {
		if (moment(chartData[index].date).isAfter(moment(selectedTimeRangeOption)))
			return d;
	});
	function onChangeTimeRange(selectedTimeRangeOption) {
		setTimeRangeOption(selectedTimeRangeOption);
	}
	function onChangeCaseType(selectedCaseType) {
		setCaseType(selectedCaseType);
	}
	return (
		<section id='chartBar' className={styles.section_wrapper}>
			<p className={styles.section_title}>chart bar</p>
			<InputCases 
				onChangeCaseType={onChangeCaseType} 
				cases={allCases}
				casesLabels={allCasesLabels}	
				/>
			<div className={styles.chartbar_container}>
				<ResponsiveBar
					data={timeFilterChartData}
					keys={[selectedCaseType]}
					indexBy='date'
					margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
					padding={0.3}
					groupMode='grouped'
					minValue={0}
					colors={'grey'}
					onMouseEnter={(_data, event) => {
						event.target.style.fill = '#f8c90a';
						event.target.style.transform = '0.2s';
					}}
					onMouseLeave={(_data, event) => {
						event.target.style.fill = 'grey';
					}}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: -45,
						legendPosition: 'middle',
						legendOffset: 32,
						renderTick: (tick) => {
							if (tick.tickIndex % 5) {
								return '';
							} else {
								return (
									<g
										transform={`translate(${tick.x - 10},${
											tick.y + 22
										}) rotate(${tick.rotate})`}
									>
										<text style={{ fontSize: 10 }}>
											{tick.value.slice(5, 9)}
										</text>
									</g>
								);
							}
						},
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legendPosition: 'middle',
						legendOffset: -40,
					}}
					labelSkipWidth={52}
					labelSkipHeight={52}
					animate={true}
					motionStiffness={115}
					motionDamping={15}
				/>
			</div>
			<InputRadioTimeRange onChangeTimeRange={onChangeTimeRange} />
		</section>
	);
}
export default ChartBar;
