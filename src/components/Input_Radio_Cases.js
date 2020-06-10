import React, { useState } from 'react';
import styles from './Input_Radio_Cases.module.scss';
import casesNames from '../assets/cases_names';

export default function InputRadioCases({ onChangeCaseType }) {
	const [checkedButton, setCheckedButton] = useState('confirmed');

	function handleChangeCaseType(e) {
		onChangeCaseType(e.target.value);
		setCheckedButton(e.target.value);
  }

	return (
		<div className={styles.cases_btn_container}>
      <div className={styles.rectangle}/>
			{casesNames.map((el) => (
				<form 
					className={styles[el.value + "_form"]} 
          key={el.value + 'form'} >
					<input 
            className={styles.radio_btn}
            type='radio'
						name='casesType'
						onChange={(e) => handleChangeCaseType(e)}
						value={el.value}
						key={el.value}
						checked={checkedButton === el.value}
            />
          <span className={styles.dot}/>
					<label htmlFor={el.value} key={el.value + 'label'}/>
				</form>
			))}
			<div className={styles.txt_container}>
				<p className={styles.label_cumulative}>cumulative</p>
				<p className={styles.label_new_cases}>new cases</p>
				<p className={styles.label_confirmed}>confirmed</p>
				<p className={styles.label_deaths}>deaths</p>
				<p className={styles.label_recovered}>recovered</p>
			</div>
		</div>
	)
}
