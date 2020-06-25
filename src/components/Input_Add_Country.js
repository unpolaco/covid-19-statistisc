import React, { useState, useRef, useContext } from 'react';
import styles from './Input_Search.module.scss';
import countries from '../assets/world_countries.json';
// import { CountryContext } from '../context/country_context';

export default function InputSearch({onFilterCountryList, onClickCountryList, textValue}) {
	const countryList = [];
	const l = countries.features.length;
	for (let i = 0; i < l; i++) {
		countryList.push(countries.features[i].id);
	}

	const [isCountryListVisible, setIsCountryListVisible] = useState(false)
	const countryInput = useRef(null);

	function handleActiveCountryList() {
    setIsCountryListVisible(true)
  }
  function handleClickCountryList(e) {
    onClickCountryList(e)
  }
  function handleFilterCountryList(e) {
    onFilterCountryList(e.target.value)
  }

	return (
		<div className={styles.search_wrapper}>
			<input
				onKeyDown={handleActiveCountryList}
				onChange={e => handleFilterCountryList(e)}
				ref={countryInput}
				autoComplete='off'
			></input>

			<ul 
			className={ isCountryListVisible ?  styles.visible : styles.country_list}>
				{countryList
					.filter((name) => {
						return name.toUpperCase().includes(textValue.toUpperCase());
					})
					.map((filteredName) => (
						<li
							onClick={e => handleClickCountryList(e)}
							key={filteredName + 'countryList'}
						>
							{filteredName}
						</li>
					))}
			</ul>
		</div>
	);
}
