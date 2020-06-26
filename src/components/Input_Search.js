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
	const [selectedCountry, setCountry] = useState('');
	const [textValue, setTextValue] = useState('');
	const [isCountryListVisible, setIsCountryListVisible] = useState(false)
	const countryInput = useRef(null);

	function handleSubmitCountry() {
		countryContext.setInputCountry(countryInput.current.value)
		setTextValue('')
	}
	function handleFilterCountryList(e) {
		setTextValue(e.target.value);
	}
	function handleClickCountryList(e) {
		setCountry(e.target.innerText);
		setTextValue(e.target.innerText)
		setIsCountryListVisible(false)
	}
	function handleActiveCountryList() {
		setIsCountryListVisible(true)
	}
	return (
		<div className={styles.search_wrapper}>
			<input
				onKeyDown={handleActiveCountryList}
				onChange={handleFilterCountryList}
				ref={countryInput}
				autoComplete='off'
				value={textValue}
			></input>
			{/* <label htmlFor='country'>country name</label> */}
			<button
				className={styles.search_btn}
				type='submit'
				htmlFor='country'
				onClick={handleSubmitCountry}
			>
				search
			</button>
			<ul 
			className={ isCountryListVisible ?  styles.visible : styles.country_list}>
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
