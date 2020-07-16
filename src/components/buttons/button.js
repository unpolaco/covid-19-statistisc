import React from 'react';
import styles from './button.module.scss';

export default function Button({name, value, handleClick, secondary}) {
	return (
		<button
			className={secondary ? styles.secondary_btn : styles.primary_btn}
			onClick={handleClick}
			value={value}
			name={name}
		>
			{name}
		</button>
	);
}
