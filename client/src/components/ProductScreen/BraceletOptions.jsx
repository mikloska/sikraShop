import React from 'react'
import{ListItem, FormControl, Select, MenuItem, InputLabel}  from '@material-ui/core/'

const BraceletOptions = ({braceletSize, setBraceletSize, formControlClass}) => {
  return(
    <ListItem>
      <FormControl className={formControlClass} value={braceletSize} >
        <InputLabel>Size</InputLabel>
        <Select defaultValue='medium' onChange={e=>setBraceletSize(e.target.value)}>
          <MenuItem value={'small'}>small</MenuItem>
          <MenuItem value={'medium'}>medium</MenuItem>
          <MenuItem value={'large'}>large</MenuItem>
        </Select>
      </FormControl>
    </ListItem>    
  )
}

export default BraceletOptions