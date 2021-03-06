import React from 'react'

const TextField = props => {
  return(
    <label>{props.label}
      <input
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.handleChangeMethod}
      />
    </label>
  )
}

export default TextField;
