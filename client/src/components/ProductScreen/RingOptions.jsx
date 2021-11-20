import React, {useState} from 'react'
import{FormControl, Select, InputLabel}  from '@material-ui/core/'

const RingOptions = ({ringSizes, setRingSize, formControlClass}) => {
  return(
    <FormControl className={formControlClass} style={{border:'1px'}}>
      <InputLabel>Size</InputLabel>
      <Select onChange={(e)=>setRingSize(e.target.value)} defaultValue='7'>
        {ringSizes}
      </Select>
    </FormControl>
  )
}

export default RingOptions