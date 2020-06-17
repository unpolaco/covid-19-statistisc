import React from 'react';
import styles from './InputRange.module.scss';

export default function InputRange(props) {
	return (
		<input
			className={styles.input_range}
			type='range'
			max='250000'
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
