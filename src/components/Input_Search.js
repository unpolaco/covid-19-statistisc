import React, { useState, useRef, useContext } from 'react';
import styles from './Input_Search.module.scss';
import countries from '../assets/world_countries.json';
import { CountryContext } from '../context/country_context';
import { Link } from 'react-router-dom';

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
		if(countryList.indexOf(selectedCountry) > -1) {
			countryContext.setInputCountry(countryInput.current.value)
			setTextValue('')
		} else {
			alert("Please enter correct country name")
			setTextValue('')
		}
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
				className={styles.search_input}
				onKeyDown={handleActiveCountryList}
				onChange={handleFilterCountryList}
				ref={countryInput}
				autoComplete='off'
				value={textValue}
			></input>
					<Link 
						to= 'countryPage'
						smooth={true} 
						offset={0} 
						duration={500}>
				<button
					className={styles.search_btn}
					type='submit'
					htmlFor='country'
					onClick={handleSubmitCountry}
				>
					search
				</button>
					</Link>
			<ul 
			className={ isCountryListVisible ?  styles.visible : styles.invisible}>
				{countryList
					.filter((name) => {
						return name.toUpperCase().includes(textValue.toUpperCase());
					})
					.map((filteredName) => (
						<li
							className={styles.countryList_item}
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
