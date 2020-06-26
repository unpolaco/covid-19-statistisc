import React from 'react'
import styles from './TextValues.module.scss'

export default function TextValues({name, value, caseName, caseType}) {
  return (
    <div className={styles.wrapper}>     
      <p className={`${styles[caseType]} ${styles[caseName]} ${styles.number}`}>{caseType === 'new' ? '+' : null}{value}</p>
      <p>{caseType === 'update' ? 'last update: ' : null}{name}</p>
    </div>
  )
}
