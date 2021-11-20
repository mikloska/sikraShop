import React from 'react'
import{Grid, Typography, List, ListItem, ListItemText, Radio,Divider, RadioGroup, FormControl, FormLabel, FormControlLabel,
 Select, MenuItem, InputLabel, TextField, Button}  from '@material-ui/core/'

const NecklaceOptions = ({formClass, chain, setChain}) => {
  return(
    <FormControl className={formClass} noValidate style={{border:'1px'}}>
      <FormLabel component="legend">Necklace Material</FormLabel>
      <RadioGroup row onChange={(e)=>setChain(e.target.value)} value={chain}>
        <FormControlLabel control={<Radio  id='silver' value='silver' name="chain" />}label='silver'>Silver</FormControlLabel>
        <FormControlLabel control={<Radio  id='cord' value='cord' name="chain" />}label='cord'>Cord</FormControlLabel>
        <FormControlLabel control={<Radio  id='none' value='none' name="chain" />}label='none'>none</FormControlLabel>
      </RadioGroup>
    </FormControl>  
  )
}

export default NecklaceOptions