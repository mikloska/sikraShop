import React from 'react'
import{Paper, Link, Grid}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Rating from './Rating'
import Loader from '../components/Loader'
import StarIcon from '@material-ui/icons/Star';

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
          {product.image ? <img src={product.image[0]} alt={product.name} className={classes.Media}/> : <Loader/>}
            {/* <img src={product.image} className={classes.Media}/>  */}
          <Grid container justifyContent='center' spacing={1}>
            <Grid item  >
              <Typography style={{paddingTop:4, paddingBottom:7.4}} variant = "subtitle2">
              <strong >{product.name}</strong>
              </Typography>
            </Grid>
            
            {product.reviews.length > 0 && <Grid item md={3} ><Rating value={product.rating}/></Grid>}
                    
          </Grid>
           
          
          
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