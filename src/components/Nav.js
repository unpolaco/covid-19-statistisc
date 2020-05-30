import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import {  Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

export default function Nav() {
	return (
		<nav className='navLinks'>
			<ul>
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
		</nav>
	);
}
