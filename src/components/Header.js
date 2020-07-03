import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Header.module.scss';
import Button from './Button';
import InputSearch from './Input_Search';

export default function Header({ name }) {
	const headerCountryLinks = ['top', 'chart bar', 'line chart'];
	const headerGlobalLinks = ['top', 'map', 'summary table'];

	return (
		<header className={styles.header}>
			<ul className={styles.button_list}>
				{name === 'global'
					? headerGlobalLinks.map((el) => {
							return (
								<ScrollLink to={el} smooth={true} offset={0} duration={500}>
									<li>
										<Button name={el} />
									</li>
								</ScrollLink>
							);
					  })
					: headerCountryLinks.map((el) => {
							return (
								<ScrollLink to={el} smooth={true} offset={0} duration={500}>
									<li>
										<Button name={el} />
									</li>
								</ScrollLink>
							);
					  })}
				{name === 'global' ? null : (
					<Link to='/' smooth={true} offset={0} duration={500}>
						<Button name='global page' />
					</Link>
				)}
			</ul>
			<InputSearch />
		</header>
	);
}
