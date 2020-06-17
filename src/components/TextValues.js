import React from 'react'
import styles from './TextValues.module.scss'

export default function TextValues(props) {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles[`${props.name}`]} ${styles.number}`}>235500</p>
      <p>{props.name === 'confirmed' ? 'total confirmed' : (props.name === 'deaths' ? 'total deaths' : 'total recovered')}</p>
    </div>
  )
}
