import React from 'react'

const SearchResultTile = props => {
  return(
    <div onClick={(event) => {props.handleClick(event, props.allParams)}}>
      {props.name} - {props.city}, {props.state}
    </div>
  )
}

export default SearchResultTile;
