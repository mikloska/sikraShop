import React from 'react'
import{Paper, Link}  from '@material-ui/core/'
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  Card: {
    // maxWidth: 300,
    textAlign: 'center'

  },

  Media: {
    height: 'auto',
    maxWidth:'100%'
    // maxWidth: 300,
  }
});

const Product = ({product}) => {
  const classes = useStyles()
  return (
    <div>
      <Paper elevation={7} className = {classes.Card} ml={6}>
        <Link href={`product/${product._id}`} variant='h6' style={{ color: 'inherit', textDecoration: 'inherit'}}>
          {/* <a href={`product/${product._id}`} > */}
            <img src={product.image} className={classes.Media}/> 
          <Typography variant = "subtitle2">
            <strong >{product.name}</strong>
          </Typography>
          <Typography>
            {product.rating} from {product.numReviews} reviews
          </Typography>
          <Typography>
            <strong>{product.price}</strong>
          </Typography>
        </Link>
          {/* </a> */}
      </Paper>
    </div>
  )
}

export default Product;