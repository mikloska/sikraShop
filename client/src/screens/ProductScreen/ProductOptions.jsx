import React, {useState} from 'react'
import{Grid, Typography, List, ListItem, ListItemText, Radio,Divider, RadioGroup, FormControl, FormLabel, FormControlLabel,
Select, MenuItem, InputLabel, TextField, Button}  from '@material-ui/core/'

export const ProductOptions = () => {


  return(
    <List>
      <ListItem>
        <ListItemText>Unit Price:   <strong>${product.category==='necklaces'? (product.price+chainObj[chain]).toFixed(2) : product.price}</strong></ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Total Price:   <strong>${product.category==='necklaces'? ((product.price*qty) + (chainObj[chain]*qty)).toFixed(2) : ((product.price*qty).toFixed(2))}</strong></ListItemText>
      </ListItem>
    </List>
  )
}

export default ProductOptions
