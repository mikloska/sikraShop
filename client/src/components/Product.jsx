import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Box: {
    width: 300,
    margin: 'auto'
    
  },
  Media: {
    height: 'auto',
    width: 300,
  }
});

const Product = ({product}) => {
  const classes = useStyles()
  return (
    <div>
      <Box elevation={3} className = {classes.Card}>
      
        <a href={`product/${product._id}`} className={classes.Media}>
          
          <img src={product.image}/> 
        </a>

      </Box>
      
    </div>
  )
}

export default Product;