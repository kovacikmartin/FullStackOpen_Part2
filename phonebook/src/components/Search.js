import React from 'react'

const Search = ({searchHandle, text}) => <>{text}<input onChange={searchHandle}/></>

export default Search