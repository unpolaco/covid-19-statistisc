import React from 'react'
import styles from './TextValues.module.scss'

export default function TextValues(props) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles[`${props.name}`] }>235500</h2>
      <p>{props.name === 'confirmed' ? 'total confirmed' : (props.name === 'deaths' ? 'total deaths' : 'total recovered')}</p>
    </div>
  )
}
