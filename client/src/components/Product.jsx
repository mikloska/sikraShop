import React from 'react'
import{Paper, Link}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Rating from './Rating'

const useStyles = makeStyles({
  Card: {
    textAlign: 'center'
  },

  Media: {
    height: 'auto',
    maxWidth:'100%'
  }
});

const Product = ({product}) => {
  const classes = useStyles()
  return (
    <div>
      <Paper elevation={7} className = {classes.Card} ml={6}>
        <Link component={RouterLink} to={`product/${product._id}`} variant='h6' style={{ color: 'inherit', textDecoration: 'inherit'}}>
          {/* <a href={`product/${product._id}`} > */}
            <img src={product.image} className={classes.Media}/> 
          <Typography variant = "subtitle2">
            <strong >{product.name}</strong>
          </Typography>
          <Typography component={'span'}>
            <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
            {/* {product.rating} from {product.numReviews} reviews */}
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