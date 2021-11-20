import React from 'react'
import {List, ListItem, FormControl, Select, MenuItem, InputLabel, Grid}  from '@material-ui/core/'
import CustomButton from '../CustomButton'

const AddToBasket = ({product, formControlClass, qty, setQty, handleAddToBasket}) => {
  return(
    <div>
      {product.countInStock > 0 && (
      <List>
        <ListItem>
          {/* Update quantity state to be the selected value. */}
          <FormControl className={formControlClass} value={qty} >
            <InputLabel>Quantity</InputLabel>
            <Select defaultValue='1' onChange={e=>setQty(e.target.value)}>
              {/* Nothing will display after selected without a value!! */}
              {[...Array(product.countInStock).keys()].map(x=> (
                <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
  
      </List>
      
      
      )}
      <Grid style={{marginTop:20}} item md={12}>
        <CustomButton disabled={product.countInStock===0} onClick={handleAddToBasket} text={'Add To Basket'}/>
      </Grid>
    </div>
  )

}

export default AddToBasket