import React from 'react';
import styles from './button.module.scss';

export default function Button(props) {
	return (
		<button
			className={props.back ? styles.backBtn : styles.primary_btn}
			onClick={props.handleClick}
			value={props.value}
			name={props.name}
		>
			{props.name}
		</button>
	);
}
