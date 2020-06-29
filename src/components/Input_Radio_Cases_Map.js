import React, { useState } from 'react';
import styles from './Input_Radio_Cases_Map.module.scss';
import { threeCases } from '../assets/cases_names';

export default function InputRadioCases({ onChangeCaseType }) {
	const [checkedButton, setCheckedButton] = useState('confirmed');

	function handleChangeCaseType(e) {
		onChangeCaseType(e.target.value);
		setCheckedButton(e.target.value);
  }

	return (
		<div className={styles.wrapper}>
		<p>set type of cases for display</p>
		<div className={styles.cases_btn_container}>
      <div className={styles.rectangle}/>
			{	threeCases.map(el => (
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
				<p className={styles.label_confirmed}>confirmed</p>
				<p className={styles.label_deaths}>deaths</p>
				<p className={styles.label_recovered}>recovered</p>
			</div>
		</div>
		</div>
	)
}
