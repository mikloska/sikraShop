import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{Grid, Typography, List, ListItem, FormControl, Select, MenuItem, InputLabel, TextField, Button}  from '@material-ui/core/'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails, createProductReview} from '../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import ProductImages from '../components/ProductScreen/ProductImages'
import ProductInfo from '../components/ProductScreen/ProductInfo'
import ProductOptions from '../components/ProductScreen/ProductOptions'
import ProductReviews from '../components/ProductScreen/ProductReviews'

const useStyles = makeStyles((theme)=>({
  AdminButtons:{
   marginLeft:30, 
   color:'white',
   backgroundColor:'#067e78'
  },
  form: {
    width: '100%',
    // marginTop: theme.spacing(1),
  },
  root: {
    marginTop:50
  },
  formControl: {
    width: 100
  }
}))

const ProductScreen = ({history, match}) =>{
  const [rearrange, setRearrange] = useState(false)
  const [imageArr, setImageArr] = useState([])
  const dispatch = useDispatch()
  const productDetails= useSelector(state=>state.productDetails)
  const userLogin = useSelector((state) => state.userLogin)
  const {userInformation} = userLogin
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {success: successProductReview, loading: loadingProductReview, error: errorProductReview} = productReviewCreate
  const [successMessage, setSuccessMessage] = useState(false)
  const {loading, error, product} = productDetails
  const [chain, setChain] = useState('silver')
  const chainObj = {'silver':35,'cord':10,'none':0}
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const classes = useStyles()

  useEffect(()=>{
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    if (successProductReview) {
      setSuccessMessage(true)
      setRating(0)
      setComment('')
    }
    dispatch(listProductDetails(match.params.id))
  },[dispatch, match, successProductReview])

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const setNewImages= async ()=>{
    if(product.image.length===imageArr.length){
      await axios.put(`/api/products/images/${product._id}`, {imageArr:imageArr})
      dispatch(listProductDetails(match.params.id))
      setRearrange(false)
      setImageArr([])
    }
  }

  return (
    <div className={classes.root}  style={{marginTop:35, marginBottom: 45, padding:20}}>
      {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> :
      <Grid container spacing={2} justifyContent='center'>
        <Grid item md={5}>
          <ProductImages product={product} rearrange={rearrange} setRearrange={setRearrange} match={match.params.id} imageArr={imageArr} setImageArr={setImageArr} setNewImages={setNewImages} history={history}/>
        </Grid>
        <Grid item xs={12} md={6} >
          <ProductInfo product={product} userInformation={userInformation}  chain={chain} chainObj={chainObj}
          setRearrange={setRearrange} AdminButtonsClass={classes.AdminButtons} history={history} Rating={Rating}/>
        </Grid>
        <Grid item md={12} xs={12}>
          <ProductOptions product={product} match={match.params.id} history={history} chain={chain} setChain={setChain} chainObj={chainObj}/>
        </Grid>
        <Grid item md={9} xs={9} style={{marginTop:50}}>
          <ProductReviews product={product} userInformation={userInformation} handleReviewSubmit={handleReviewSubmit} successProductReview={successProductReview} loadingProductReview={loadingProductReview} 
          errorProductReview={errorProductReview} formClass={classes.form} rating={rating} setRating={setRating} comment={comment} setComment={setComment} Rating={Rating} successMessage={successMessage}/>
        </Grid>
      </Grid>}

    </div>
    
  )
}


export default ProductScreen;