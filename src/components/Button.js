import React from 'react';

export default function Button(props) {

  return(
    <button onClick={props.handleClick} value={props.value} name={props.name}>{props.name}</button>
  )
}