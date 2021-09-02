import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{Paper, Link, Card, Button, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, 
Divider, FormControl, Select, MenuItem, InputLabel, TextField}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails, createProductReview} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


// import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'
// import axios from 'axios'

const useStyles = makeStyles((theme)=>({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    width:'100px',
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
  const [currentImage, setCurrentImage] = useState('')
  const [firstRender, setFirstRender] = useState(true)
  const classes = useStyles()
  // const [product,setProduct] = useState({})

  useEffect(()=>{
    // dispatch({type:PRODUCT_DETAILS_RESET})
    if (successProductReview) {
      setRating(0)
      setComment('')
      
    }
    // axios.get(`/api/products/${match.params.id}`)
    //   .then(res => {
    //   setProduct(res.data);
    // })
    // .catch(err => console.log(err))
    // console.log(product.image)
    dispatch(listProductDetails(match.params.id))
    if(product.image) setCurrentImage(product.image[0])
    
  },[dispatch, match, successProductReview])

  const handleAddToBasket = () => {
    
    history.push(`/basket/${match.params.id}?qty=${qty}`)
  }

  const updateImage = (pic) =>{
    // console.log(e)
    setCurrentImage(pic)
    setFirstRender(false)
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
      <Grid container spacing={3}>``
        <Grid item md={6}>
          {/* {product.image ? <img src={product.image[0]} alt={product.name} className={classes.Image}/> : <Loader/>} */}
          {product.image&&firstRender===true ? <img src={product.image[0]} alt={product.name} className={classes.Image}/> :
          product.image&&firstRender===false ? <img src={currentImage} alt={product.name} className={classes.Image}/> : <Loader/>}
          {product.image ? product.image.map(image =>(
          <img src={image} key={image} style={{width:'100px', padding:'4px', cursor: 'pointer'}} className={classes.Image} alt={product.name} onClick={()=>updateImage(image)}/>
        )) : <Loader/>}
        </Grid>
        
        {/* {product.image ? product.image.map(image =>(
          <Grid item md={1} xs={2} key={image}><img src={image} style={{width:'max-100%', cursor: 'pointer'}} className={classes.Image} alt={product.name} onClick={()=>updateImage(image)}/></Grid>
        )) 
        
        
        : <Loader/>} */}
        <Grid item xs={12} md={5} style={{marginLeft:'20px'}}>
          <List>
            <ListItem>
              <Typography style={{fontSize:'30px'}}>{product.name}</Typography>
            </ListItem>
            <Divider light />
            {product.reviews.length > 1 &&
            <ListItem>
              <Rating value={product.rating}/>
              <ListItemText style={{marginLeft:10}} >{`${product.numReviews} reviews`}</ListItemText>
            </ListItem>}
            {product.reviews.length === 1 &&
            <ListItem>
              <Rating value={product.rating}/>
              <ListItemText style={{marginLeft:10}} >{`${product.numReviews} review`}</ListItemText>
            </ListItem>}
            {product.reviews.length > 0 &&<Divider light />}
            <ListItem>
              <ListItemText>Price: ${product.price}</ListItemText>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText>{product.description}</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={6} md={4}>
          {/* <Grid container > */}
            {/* <Grid item md={5}> */}
          <List>
            <ListItem>
              <ListItemText>Price:   <strong>${product.price*qty}</strong></ListItemText>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemText>Status:   {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</ListItemText>
            </ListItem>
          </List>
          </Grid>
          {/* </Grid> */}
        {/* </Grid> */}
        {/* <Grid item xs={4} md={4}> */}
        <Grid item xs={6} md={4}>
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

        {/* </Grid> */}
        </Grid>
        </Grid>
        </Grid>
        <Grid item md={9} xs={11} style={{marginTop:50}}>
          <Typography style={{fontSize:'25px'}}>Reviews</Typography>
          <List>
          {product.reviews.length === 0 && <Message style={{margin:20}}>No Reviews</Message>}
            
                {product.reviews.map((review) => (
                  <List key={review._id}>
                    <ListItem>
                      <div style={{marginRight: 10}}><strong >{review.name}</strong></div>
                      {review.createdAt.substring(0, 10)}
                    
                      
                    </ListItem>
                    <ListItem>
                      <Rating value={review.rating} />
                    </ListItem>
                    <ListItem>
                      <p>{review.comment}</p>
                    </ListItem>
                  </List>
                ))}
             
            {successProductReview && ( <Message severity='success'>Review submitted successfully</Message>)}
            <Typography style={{fontSize:'25px',marginTop:20}}>Write a review</Typography>
            <ListItem>
                          
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