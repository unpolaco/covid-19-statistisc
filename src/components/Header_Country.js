import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Header.module.scss';
import Button from './Button';
import InputSearch from './Input_Search';
import CountryContext from '../context/country_context';

export default function HeaderCountry() {
	return (
		<header className={styles.header}>

			<ul className={styles.button_list}>
      <ScrollLink to='countryPage' smooth={true} offset={0} duration={500}>
					<li>
						<Button name='top' />
					</li>
				</ScrollLink>
				<Link to='/' smooth={true} offset={0} duration={500}>
						<Button name='global' />
				</Link>
			</ul>
				<InputSearch />
		</header>
	);
}
