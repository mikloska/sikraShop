import React from 'react'
import {List, ListItem, ListItemText}  from '@material-ui/core/'

const Pricing = ({product, chain, chainObj, qty}) => {
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

export default Pricing