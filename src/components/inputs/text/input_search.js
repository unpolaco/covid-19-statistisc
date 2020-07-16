import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../../context/country_context';
import styles from './input_search.module.scss';
import countries from '../../../assets/countries.json';

export default function InputSearch() {
	const countryList = [];
	const l = countries.features.length;
	for (let i = 0; i < l; i++) {
		countryList.push(countries.features[i].id);
	}
	const countryContext = useContext(CountryContext);
	const [selectedCountry, setCountry] = useState('');
	const [textValue, setTextValue] = useState('check country');
	const [isCountryListVisible, setIsCountryListVisible] = useState(false);
	const countryInput = useRef(null);
	const countryListRef = useRef(null);

	const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsCountryListVisible(false);
    }
  };
  const handleClickOutside = event => {
    if (countryListRef.current && !countryListRef.current.contains(event.target)) {
      setIsCountryListVisible(false);
		}
	}	

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

	function handleSubmitCountry() {
		if (countryList.indexOf(selectedCountry) > -1) {
			countryContext.setInputCountry(countryInput.current.value);
			setTextValue('');
		} else {
			alert('Please enter correct country name');
			setTextValue('');
		}
	}
	function handleFilterCountryList(e) {
		setTextValue(e.target.value);
	}
	function handleClickCountryList(e) {
		setCountry(e.target.innerText);
		setTextValue(e.target.innerText);
		setIsCountryListVisible(false);
	}
	function handleActiveCountryList() {
		setIsCountryListVisible(true);
	}
	function handleClick() {
		setTextValue('');
	}
	return (
		<div className={styles.search_wrapper}>
			<input
				className={styles.search_input}
				onKeyDown={handleActiveCountryList}
				onChange={handleFilterCountryList}
				onClick={handleClick}
				ref={countryInput}
				autoComplete='off'
				value={textValue}
			></input>
			<Link to='countryPage' smooth={true} offset={0} duration={500}>
				<button
					className={styles.secondary_btn}
					type='submit'
					htmlFor='country'
					onClick={handleSubmitCountry}
				>
					search
				</button>
			</Link>
			<ul
				ref={countryListRef}
				className={isCountryListVisible ? styles.visible : styles.invisible}
			>
				{countryList
					.filter((name) => {
						return name.toUpperCase().includes(textValue.toUpperCase());
					})
					.map((filteredName) => (
						<li
							className={styles.countryList_item}
							onClick={handleClickCountryList}
							key={filteredName}
						>
							{filteredName}
						</li>
					))}
			</ul>
		</div>
	);
}
