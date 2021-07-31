import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return(
    <CircularProgress style={{width: 100, height: 100, display: 'block', margin: 'auto'}}/>

  )
}

export default Loader