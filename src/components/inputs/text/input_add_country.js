import React, { useState, useRef } from 'react';
import styles from './input_search.module.scss';
import countries from '../../../assets/countries.json';

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
				className={styles.search_input}
				onKeyDown={handleActiveCountryList}
				onChange={e => handleFilterCountryList(e)}
				ref={countryInput}
				autoComplete='off'
			></input>
			<ul 
			className={ isCountryListVisible ?  styles.visible : styles.invisible}>
				{countryList
					.filter((name) => {
						return name.toUpperCase().includes(textValue.toUpperCase());
					})
					.map((filteredName) => (
						<li
							className={styles.countryList_item}
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
