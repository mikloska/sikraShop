import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return(
    <CircularProgress style={{width: 150, height: 150, display: 'block', margin: 'auto'}}/>

  )
}

export default Loader