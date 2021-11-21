import React from 'react'
import{FormControl, Select, MenuItem, FormLabel}  from '@material-ui/core/'

const BraceletOptions = ({braceletSize, setBraceletSize, formControlClass}) => {
  return(
    <FormControl className={formControlClass} value={braceletSize} >
      <FormLabel>Size</FormLabel>
      <Select defaultValue='medium' onChange={e=>setBraceletSize(e.target.value)}>
        <MenuItem value={'small'}>small</MenuItem>
        <MenuItem value={'medium'}>medium</MenuItem>
        <MenuItem value={'large'}>large</MenuItem>
      </Select>
    </FormControl> 
  )
}

export default BraceletOptions