import React, { useState } from 'react';
import styles from './Input_Radio_TimeRange.scss';
import { pandemicStart } from '../assets/time_range'

export default function InputRadioTimeRange({ onChangeTimeRange, timeRange }) {
	const [checkedButton, setCheckedButton] = useState(pandemicStart);

	function handlerChangeTimerRange(e) {
		onChangeTimeRange(e.target.value);
		setCheckedButton(e.target.value);
	}

	return (
		<div className={styles.time_range_container}>
			{timeRange.map((el) => (
				<form id={el.value + 'form'} key={el.value + 'form'}>
					<input
						type='radio'
						name={timeRange}
						onChange={(e) => handlerChangeTimerRange(e)}
						value={el.value}
						key={el.value}
						id={el.value}
						checked={checkedButton === el.value}
					></input>
					<label htmlFor={el.value} key={el.value + 'label'}>
						{el.displayTime}
					</label>
				</form>
			))}
		</div>
	);
}
