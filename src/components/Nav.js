import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Nav.module.scss';
import Button from './Button';
export default function Nav() {
	return (
		<header className={styles.header}>
			<ul className={styles.button_list}>
				<ScrollLink
					to='top'
					smooth={true}
					offset={0}
					duration={500}
				>
					<li>
						<Button name='top' />
					</li>
				</ScrollLink>
				<ScrollLink
					to='map'
					smooth={true}
					offset={0}
					duration={500}
				>
					<li>
						<Button name='map' />
					</li>
				</ScrollLink>
				<ScrollLink
					to='summaryTable'
					smooth={true}
					offset={0}
					duration={500}
				>
					<li>
						<Button name='table' />
					</li>
				</ScrollLink>
				<Link
					to='/'
					smooth={true}
					offset={0}
					duration={500}
				>
					<li>
						<Button name='global' />
					</li>
				</Link>
				<Link
					to='countryPage'
					smooth={true}
					offset={0}
					duration={500}
				>
					<li>
						<Button name='country' />
					</li>
				</Link>
			</ul>
		</header>
	);
}
