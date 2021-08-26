import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{Paper, Link, Card, Button, Grid}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating'
import {List, ListItem, ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, TextField} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails, createProductReview} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// import axios from 'axios'

const useStyles = makeStyles((theme)=>({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    marginTop:50
  },
  Image: {
    width:'100%'
  },
  formControl: {
    minWidth: 100
  }
}))


const ProductScreen = ({history, match}) =>{
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const productDetails= useSelector(state=>state.productDetails)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {success: successProductReview, loading: loadingProductReview, error: errorProductReview} = productReviewCreate
  const {loading, error, product} = productDetails
  const classes = useStyles()
  // const [product,setProduct] = useState({})

  useEffect(()=>{
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    // axios.get(`/api/products/${match.params.id}`)
    //   .then(res => {
    //   setProduct(res.data);
    // })
    // .catch(err => console.log(err))
    
    dispatch(listProductDetails(match.params.id))
  },[dispatch, match, successProductReview])

  const handleAddToBasket = () => {
    
    history.push(`/basket/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  
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
          <Grid container >
            <Grid item md={5}>
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
          </Grid>
          {product.countInStock > 0 && (
          <List>
            <ListItem>
              {/* Update quantity state to be the selected value. */}
              <FormControl className={classes.formControl} value={qty} >
                <InputLabel>Quantity</InputLabel>
                <Select defaultValue='1' onChange={e=>setQty(e.target.value)}>
                  {/* Nothing will display after selected without a value!! */}
                  {[...Array(product.countInStock).keys()].map(x=> (
                    <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            {/* <Grid item md={5}>  */}
          <ListItem>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{width:'80%'}} disabled={product.countInStock===0} onClick={handleAddToBasket}>
              Add To Basket
            </Button>
          </ListItem>
          {/* </Grid> */}
          </List>)}

        </Grid>
        </Grid>
        <Grid item md={6} sm={11}>
          <List>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
 
                {product.reviews.map((review) => (
                  <ListItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListItem>
                ))}
            <ListItem>
              <ListItemText>Write a Review</ListItemText>
              {successProductReview && ( <Message severity='success'>Review submitted successfully</Message>)}
              {loadingProductReview && <Loader />}
              {errorProductReview && (<Message severity='error'>{errorProductReview}</Message>)}
              {userInformation ? (
                <form onSubmit={submitHandler} className={classes.form}>
                  {/* <Form.Group controlId='rating'> */}
                  <FormControl id='rating' value={rating} fullWidth style={{marginTop:20}}>
                  <InputLabel>Rating</InputLabel>
                    <Select defaultValue={''} onChange={(e) => setRating(e.target.value)}>
                      <MenuItem value='1'>1 - Poor</MenuItem>
                      <MenuItem value='2'>2 - Fair</MenuItem>
                      <MenuItem value='3'>3 - Good</MenuItem>
                      <MenuItem value='4'>4 - Very Good</MenuItem>
                      <MenuItem value='5'>5 - Excellent</MenuItem>
                    </Select>
                  </FormControl>
                  {/* </Form.Group> */}
                  <TextField id='comment' style={{marginTop:20}} fullWidth multiline aria-label="empty textarea" value={comment} 
                    onChange={(e) => setComment(e.target.value)} placeholder={'Comment'} name="comment"
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loadingProductReview} type='submit'>
                    Submit
                  </Button>
                </form>
              ) : (
                <Message>
                  Please <RouterLink style={{color:'#067e78'}} to='/login'>sign in</RouterLink> to write a review{' '}
                </Message>
              )}
            </ListItem>
          </List>

        </Grid>
        
      </Grid>}

    </div>
    
  )
}


export default ProductScreen;