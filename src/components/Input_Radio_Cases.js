import React, { useState } from 'react';
import styles from './Input_Radio_Cases.module.scss';
import { allCases } from '../assets/cases_names';

export default function InputRadioCases({ onChangeCaseType }) {
	const [checkedButton, setCheckedButton] = useState('confirmed');
	function handleChangeCaseType(e) {
		onChangeCaseType(e.target.value);
		setCheckedButton(e.target.value);
	}
	const labels = [
		{ name:'cumulative', style: styles.label_cumulative},
		{ name:'new cases', style: styles.label_new_cases},
		{ name:'confirmed', style: styles.label_confirmed},
		{ name:'deaths', style: styles.label_deaths},
		{ name:'recovered', style: styles.label_recovered},
]
	return (
		<div className={styles.wrapper}>
		<div className={styles.cases_btn_container}>
      <div className={styles.rectangle}/>
			{allCases.map((el) => (
				<form 
					className={styles[el + "_form"]} 
          key={el + 'form'} >
					<input 
            className={styles.radio_btn}
            type='radio'
						name='casesType'
						onChange={(e) => handleChangeCaseType(e)}
						value={el}
						key={el}
						checked={checkedButton === el}
            />
          <span className={styles.dot}/>
					<label htmlFor={el} key={el + 'label'}/>
				</form>
			))}
			<div className={styles.txt_container}>
			{labels.map(el => {
				return <p className={el.style}>{el.name}</p>
			})}
			</div>
		</div>
		</div>
	)
}
