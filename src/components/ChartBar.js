import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import 'moment/locale/pl';
import moment from 'moment';
import styles from './ChartBar.module.scss';
import InputRadioTimeRange from './Input_Radio_TimeRange';
import { pandemicStart } from '../assets/time_range';
import InputRadioCases from './Input_Radio_Cases';

function ChartBar({chartData}) {
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
			<InputRadioCases onChangeCaseType={onChangeCaseType} />
			<div className={styles.chartbar_container}>
				<ResponsiveBar
					data={timeFilterChartData}
					keys={[selectedCaseType]}
					indexBy='date'
					margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
					padding={0.3}
					groupMode='grouped'
					minValue={0}
					colors={{ scheme: 'category10' }}
					borderColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
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
										transform={`translate(${tick.x - 10},${tick.y + 22}) rotate(${
											tick.rotate
										})`}
									>
										<text style={{ fontSize: 10 }}>{tick.value.slice(5, 9)}</text>
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
					labelSkipWidth={15}
					labelSkipHeight={15}
					labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
					animate={true}
					motionStiffness={115}
					motionDamping={15}
				/>
			</div>
			<InputRadioTimeRange
				onChangeTimeRange={onChangeTimeRange}
			/>
		</section>
	);
}
export default ChartBar;
