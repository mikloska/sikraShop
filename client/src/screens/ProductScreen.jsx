import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{Paper, Link, Card, Button, Grid}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import products from '../products'
import Rating from '../components/Rating'
import {List,ListItem,ListItemIcon,ListItemText, Divider} from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    marginTop:50
  },
  Image: {
    width:'100%'
  }
})


const ProductScreen = ({match}) =>{
  const classes = useStyles()
  const product=products.find(p => p._id===match.params.id)
  
  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item md={6}>
          <img src={product.image} alt={product.name} className={classes.Image}/>
        </Grid>
        <Grid item md={3}>
          <List>
            <ListItem>
              <ListItemText>{product.name}</ListItemText>
            </ListItem>
            <Divider light />
            <ListItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText>Price: ${product.price}</ListItemText>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText>{product.description}</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3}>
          <List>
            <ListItem>
              <ListItemText>Price:   <strong>${product.price}</strong></ListItemText>
            </ListItem>
          </List>
        </Grid>
        
      </Grid>

    </div>
    
  )
}


export default ProductScreen;