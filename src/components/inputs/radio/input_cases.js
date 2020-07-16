import React, { useState } from 'react';
import styles from './input_cases.module.scss';
import { totalCases } from '../../../assets/cases_names';

export default function InputCases({ onChangeCaseType, cases, casesLabels }) {
	const [checkedButton, setCheckedButton] = useState('confirmed');

	function handleChangeCaseType(e) {
		onChangeCaseType(e.target.value);
		setCheckedButton(e.target.value);
	}
	return (
		<div className={styles.wrapper}>
			<p className={styles.cases_label}>set type of cases for display</p>
			<div className={styles.cases_btn_container}>
				<div className={cases===totalCases ? 
					styles.rectangle_total : 
					styles.rectangle} 
				/>
				{cases.map((el) => (
					<form
						className={cases===totalCases ? 
							`${styles['total_' + el + '_form']} ${styles.form_cases}` : 
							`${styles[el + '_form']} ${styles.form_cases}`}
						key={cases===totalCases ? el + 'total' : el}
					>
						<input
							className={styles.radio_btn}
							type='radio'
							name='casesType'
							onChange={(e) => handleChangeCaseType(e)}
							value={el}
							checked={checkedButton === el}
						/>
						<span className={styles.dot}/>
					</form>
				))}
				{casesLabels.map((el) => {
						return (
							<label 
								className={`${styles[el.style]} ${styles.labels}`} 
								key={el.style}
							>
								{el.name}
							</label>
						);
					})}
			</div>
		</div>
	);
}
