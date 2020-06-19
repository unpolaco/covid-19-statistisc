import React from 'react'
import styles from './TextValues.module.scss'

export default function TextValues({name, value}) {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles[`${name}`]} ${styles.number}`}>{value}</p>
      <p>total {name}</p>
    </div>
  )
}
