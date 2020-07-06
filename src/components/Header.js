import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Header.module.scss';
import Button from './Button';
import InputSearch from './Input_Search';

export default function Header({ name }) {
	const headerCountryLinks = ['top', 'chart bar', 'line chart'];
	const headerGlobalLinks = ['top', 'map', 'summary table'];
  const [scrollDir, setScrollDir] = useState("scrolling down");

		useEffect(() => {
			const threshold = 0;
			let lastScrollY = window.pageYOffset;
			let ticking = false;
	
			const updateScrollDir = () => {
				const scrollY = window.pageYOffset;
				if (Math.abs(scrollY - lastScrollY) < threshold) {
					ticking = false;
					return;
				}
				setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
				lastScrollY = scrollY > 0 ? scrollY : 0;
				ticking = false;
			};
			const onScroll = () => {
				if (!ticking) {
					window.requestAnimationFrame(updateScrollDir);
					ticking = true;
				}
			};
			window.addEventListener("scroll", onScroll);
			return () => window.removeEventListener("scroll", onScroll);
		}, []);

	return (
		<header 
			className={scrollDir==="scrolling up" ? styles.header : styles.hidden}
			>
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
