import React from 'react'
import {Typography}  from '@material-ui/core/'

const Pricing = ({product, chain, chainObj, qty}) => {
  return(
    <div style={{marginTop:4}}>
      <Typography>Unit Price:   <strong>${product.category==='necklaces'? (product.price+chainObj[chain]) : product.price}</strong></Typography>
      <Typography>Total Price:   <strong>${product.category==='necklaces'? ((product.price*qty) + (chainObj[chain]*qty)).toFixed(2) : ((product.price*qty).toFixed(2))}</strong></Typography>
    </div>
  )
}

export default Pricing