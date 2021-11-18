import React, { useState, useEffect } from 'react'
import {TextField} from '@material-ui/core';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    setKeyword('')
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }    
  }

  return (
      <form onSubmit={submitHandler}>
        <TextField value={keyword} onChange={(e) => setKeyword(e.target.value)} size="small" name='q'
          variant="outlined" style={{color:"black"}} border={2} placeholder="Search…."  inputProps={{ 'aria-label': 'search' }}
        />
      </form>
  )
}

export default SearchBox