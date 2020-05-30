import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Nav.module.scss';

export default function Nav() {
	return (
		<header >
			<ul>	
				<ScrollLink
					to='top'
					activeClass='active'
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					<li>top</li>
				</ScrollLink>
				<ScrollLink
					to='map'
					activeClass='active'
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					<li>map</li>
				</ScrollLink>
				<ScrollLink
					to='summaryTable'
					activeClass='active'
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					<li>table</li>
				</ScrollLink>
				<ScrollLink
					to='chartBar'
					activeClass='active'
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					<li>chartbar</li>
				</ScrollLink>

				<Link
					to='globalPage'
					activeClass='active'
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					<li>global</li>
				</Link>
				<Link
					to='countryPage'
					activeClass='active'
					spy={true}
					smooth={true}
					offset={-70}
					duration={500}
				>
					<li>country</li>
				</Link>
			</ul>
		</header>
	);
}
