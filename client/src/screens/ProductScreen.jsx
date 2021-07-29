import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{Paper, Link, Card, Button, Grid}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating'
import {List,ListItem,ListItemIcon,ListItemText, Divider} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import axios from 'axios'

const useStyles = makeStyles({
  root: {
    marginTop:50
  },
  Image: {
    width:'100%'
  }
})


const ProductScreen = ({match}) =>{
  const dispatch = useDispatch()
  const productDetails= useSelector(state=>state.productDetails)
  const {loading, error, product} = productDetails
  const classes = useStyles()
  // const [product,setProduct] = useState({})

  useEffect(()=>{
    // axios.get(`/api/products/${match.params.id}`)
    //   .then(res => {
    //   setProduct(res.data);
    // })
    // .catch(err => console.log(err))
    dispatch(listProductDetails(match.params.id))
  },[dispatch, match])
  
  return (
    <div className={classes.root}>
      {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> :
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
          <List>
            <ListItem>
              <ListItemText>Status:   {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</ListItemText>
            </ListItem>
          </List>
          <List>
            <Button type='button' style={{width:'80%'}} variant='outlined' disabled={product.countInStock===0}>
              Add To Cart
            </Button>
          </List>
        </Grid>
        
      </Grid>}

    </div>
    
  )
}


export default ProductScreen;