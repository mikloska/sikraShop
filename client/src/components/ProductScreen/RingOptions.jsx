import React, {useState} from 'react'
import{FormControl, Select, FormLabel}  from '@material-ui/core/'

const RingOptions = ({ringSizes, setRingSize, formControlClass}) => {
  return(
    <FormControl className={formControlClass} style={{border:'1px'}}>
      <FormLabel>Size</FormLabel>
      <Select onChange={(e)=>setRingSize(e.target.value)} defaultValue='7'>
        {ringSizes}
      </Select>
    </FormControl>
  )
}

export default RingOptions