import React from 'react';
import styles from './Button.module.scss';

export default function Button(props) {
	return (
		<button
			className={styles.primary_btn}
			onClick={props.handleClick}
			value={props.value}
			name={props.name}
		>
			{props.name}
		</button>
	);
}
