import React, { useState } from 'react';
import styles from './input_time_range.module.scss';
import { timeRange, pandemicStart } from '../../../assets/time_range'

export default function InputRadioTimeRange({ onChangeTimeRange }) {
	const [checkedButton, setCheckedButton] = useState(pandemicStart);

	function handlerChangeTimerRange(e) {
		onChangeTimeRange(e.target.value);
		setCheckedButton(e.target.value);
	}

	return (
		<div className={styles.cases_btn_container}>
			{timeRange.map((el) => (
				<form 
					className={`${styles.form} ${styles[el.style]}`} 
					id={el.value + 'form'} 
					key={el.value}
				>
					<input
						className={styles.radio_btn}
						type='radio'
						name={timeRange}
						onChange={(e) => handlerChangeTimerRange(e)}
						value={el.value}
						id={el.value}
						checked={checkedButton === el.value}
					></input>
					<span className={styles.dot}/>
					<label 
						className={styles.label} 
						htmlFor={el.value} 
					>
						{el.displayTime}
					</label>
				</form>
			))}
		</div>
	);
}
