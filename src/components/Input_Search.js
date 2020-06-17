import React, { useState, useRef, useContext } from 'react';
import styles from './Input_Search.module.scss';
import countries from '../assets/world_countries.json';
import { CountryContext } from '../context/country_context';

export default function InputSearch() {
	const countryList = [];
	const l = countries.features.length;
	for (let i = 0; i < l; i++) {
		countryList.push(countries.features[i].id);
	}

	const countryContext = useContext(CountryContext)
	console.log(123, countryContext)
	const [selectedCountry, setCountry] = useState('');

	const [textValue, setTextValue] = useState('');
	const countryInput = useRef(null);

	function handleClickCountry() {
		countryContext.setInputCountry(countryInput.current.value)
		// setCountry(countryInput.current.value);
		// refetch();
	}
	function handleFilterCountryList(e) {
		setTextValue(e.target.value);
	}
	function handleClickCountryList(e) {
		setCountry(e.target.innerText);
		// refetch();
	}

	return (
		<div className={styles.search_wrapper}>
			<input
				// id='country'
				onChange={handleFilterCountryList}
				ref={countryInput}
				autoComplete='off'
			></input>
			{/* <label htmlFor='country'>country name</label> */}
			<button
				className={styles.search_btn}
				type='submit'
				htmlFor='country'
				onClick={handleClickCountry}
			>
				search
			</button>
			<ul className={styles.country_list}>
				{countryList
					.filter((name) => {
						return name.toUpperCase().includes(textValue.toUpperCase());
					})
					.map((filteredName) => (
						<li
							onClick={handleClickCountryList}
							key={filteredName + 'countryList'}
						>
							{filteredName}
						</li>
					))}
			</ul>
		</div>
	);
}
