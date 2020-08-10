import React, { useEffect, useRef } from 'react';
import virus1 from '../../assets/img/virus1.png';
import virus2 from '../../assets/img/virus2.png';
import virus3 from '../../assets/img/virus3.png';
import gsap from 'gsap';
import styles from './virus_animation.module.scss';

export default function VirusAnimation({ width, height }) {

	const virusRef1 = useRef(null)
	const virusRef2 = useRef(null)
	const virusRef3 = useRef(null)
	
	const virusesArray = [ 
		{src: virus1, ref: virusRef1}, 
		{src: virus2, ref: virusRef2}, 
		{src: virus3, ref: virusRef3},
	]

	useEffect(() => {
    function randomMove(virus) {
			gsap.to(virus.current, {
				duration: gsap.utils.random(15, 25),
				x: gsap.utils.random(0, width),
        y: gsap.utils.random(0, height),
				rotation: gsap.utils.random(60, 1520),
        opacity: gsap.utils.random(0.3, 1),
        ease: 'power1.easeInOut',
				onComplete: function () {
					randomMove(virus);
				},
			});
    }
    for (let i = 0; i < virusesArray.length; i++) {
			randomMove(virusesArray[i].ref);
		}
	}, [virusesArray, height, width]);

	return (
		<>
			{virusesArray.map(virus => {
        return <img 
									src={virus.src} 
									ref={virus.ref}
									className={styles.virus_icon} 
									alt="virus icon"
								/>
      })}
		</>
	);
}
