import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{Grid, Typography, List, ListItem, ListItemText, Radio,Divider, RadioGroup, FormControl, FormLabel, FormControlLabel,
Select, MenuItem, InputLabel, TextField, Button}  from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails, createProductReview} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import NecklaceModal from '../components/NecklaceModal';
import CustomButton from '../components/CustomButton'
// import ReactImageMagnify from 'react-image-magnify';
import { addToBasket } from '../actions/basketActions'
import axios from 'axios'
import ProductImages from './ProductScreen/ProductImages'


const useStyles = makeStyles((theme)=>({
  AdminButtons:{
   marginLeft:30, 
   color:'white',
   backgroundColor:'#067e78'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  root: {
    marginTop:50
  },
  // Image: {
  //   width:'100px', 
  //   paddingRight:4, 
  //   paddingTop:4,
  // },
  formControl: {
    minWidth: 100
  }
}))

const ProductScreen = ({history, match}) =>{
  const [qty, setQty] = useState(1)
  const [chain, setChain] = useState('silver')
  const [ringSize, setRingSize] = useState(7)
  const [braceletSize, setBraceletSize] = useState('medium')
  const [rearrange, setRearrange] = useState(false)
  // const [imageArr, setImageArr] = useState([])
  const [length, setLength] = useState(15)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const productDetails= useSelector(state=>state.productDetails)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {success: successProductReview, loading: loadingProductReview, error: errorProductReview} = productReviewCreate
  const {loading, error, product} = productDetails
  // const [currentImage, setCurrentImage] = useState('')
  // const [firstRender, setFirstRender] = useState(true)
  const chainObj = {'silver':35,'cord':10,'none':0}
  const classes = useStyles()
  //For necklace sizing modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);


  useEffect(()=>{
    if (successProductReview) {
      setRating(0)
      setComment('')
    }

    dispatch(listProductDetails(match.params.id))
    if(product.image) setCurrentImage(product.image[0])
    
  },[dispatch, match, successProductReview])

  const handleAddToBasket = () => {
    dispatch(addToBasket(match.params.id, qty, product.category==='necklaces'?chain:null, product.category==='necklaces'?length:null, product.category==='rings'?ringSize:null,product.category==='bracelets'?braceletSize:null, product.category))
    history.push('/basket')
  }

  const ringSizes = []
  for(let i = 5; i< 14; i++){
    ringSizes.push(
      <MenuItem key={i} value={i}>{i}</MenuItem>,
      <MenuItem key={i+'a'} value={i+.5}>{i+.5}</MenuItem>
    )
  }
    

  // const updateImage = (pic) =>{
  //   setCurrentImage(pic)
  //   setFirstRender(false)
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  // const rearrangeImages = (image) =>{
  //   if(!imageArr.includes(image)) setImageArr(oldArr=>[...oldArr,image])
  // }
  // const setNewImages= async ()=>{
  //   if(product.image.length===imageArr.length){
  //     await axios.put(`/api/products/images/${product._id}`, {imageArr:imageArr})
  //     dispatch(listProductDetails(match.params.id))
  //     setRearrange(false)
  //     setImageArr([])
  //   }
  // }

  return (
    <div className={classes.root}  style={{marginTop:35, marginBottom: 45, padding:20}}>
      {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> :
      <Grid container spacing={3}>
        <Grid item md={6}>
          <ProductImages product={product} rearrange={rearrange} setRearrange={setRearrange}/>
          {/* {product.image&&firstRender===true ? 
            <div>
              <ReactImageMagnify className={classes.Image} enlargedImagePosition='over' {...{
                  smallImage: {
                      alt: 'product.name',
                      isFluidWidth: true,
                      src: product.image?product.image[0]:''
                  },
                  largeImage: {
                      src: product.image?product.image[0]:'',
                      width: 1400,
                      height: 1000
                  }
              }} />
            </div>
           :

          product.image&&firstRender===false ? 
            <div>
              <ReactImageMagnify className={classes.Image} enlargedImagePosition='over' {...{
                smallImage: {
                    alt: 'product.name',
                    isFluidWidth: true,
                    src: currentImage
                },
                largeImage: {
                    src: currentImage,
                    width: 1400,
                    height: 1000
                }
              }} />
            </div>
          
          :<Loader/>}
          {product.image ? product.image.map(image =>(
            <img src={image} key={image} style={{cursor: 'pointer'}} className={classes.Image} alt={product.name} onClick={()=>{updateImage(image); rearrange&&rearrangeImages(image);}}/>
            )) 
            : <Loader/>
          } */}

          {/* {rearrange&& (
            <div style={{borderBottom:30}}>
              <Button onClick={()=>setNewImages()} className={classes.AdminButtons}>Save</Button>
              <Button onClick={()=>{setRearrange(false); setImageArr([])}} className={classes.AdminButtons}>Cancel</Button>
            </div>
          )} */}
        </Grid>
        <Grid item>
        {/* {imageArr.length>0&& imageArr.map(image=>(
          <img src={image} key={`${image}alt`} className={classes.Image} alt={product.name}/>
          ))
        } */}
        </Grid>
        <Grid item xs={12} md={5} style={{marginLeft:'20px'}}>
          <List>
            <ListItem>
              <Typography style={{fontSize:'30px'}}>{product.name}</Typography>
              {userInformation&&userInformation.isAdmin&&
                <>
                  <Button className={classes.AdminButtons} onClick={()=>history.push(`/admin/product/${product._id}/edit`)} >Edit Product</Button>
                  <Button className={classes.AdminButtons} onClick={()=>setRearrange(true)}>Rearrange Images</Button>
                </>
              }
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
              <ListItemText>

                Price: ${product.category==='necklaces'? (product.price+chainObj[chain]).toFixed(2) : product.price}
                </ListItemText>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText>

                Category: {product.category==='necklaces'?'Necklaces & Pendants':product.category==='earrings'?'Earrings':product.category==='rings'?'Rings':product.category==='bracelets'?'Bracelets':''}
                </ListItemText>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText>{product.description}</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item md={7}>
              {product.category==='necklaces'&&
                <FormControl className={classes.form} noValidate style={{border:'1px'}}>
                  <FormLabel component="legend">Necklace Material</FormLabel>
                  <RadioGroup row onChange={(e)=>setChain(e.target.value)} value={chain}>
                    <FormControlLabel control={<Radio  id='silver' value='silver' name="chain" />}label='silver'>Silver</FormControlLabel>
                    <FormControlLabel control={<Radio  id='cord' value='cord' name="chain" />}label='cord'>Cord</FormControlLabel>
                    <FormControlLabel control={<Radio  id='none' value='none' name="chain" />}label='none'>none</FormControlLabel>
                  </RadioGroup>
                </FormControl>
              }
              {product.category==='rings'&&
              <FormControl className={classes.formControl} style={{border:'1px'}}>
                <InputLabel>Size</InputLabel>
                <Select onChange={(e)=>setRingSize(e.target.value)} defaultValue='7'>
                  {ringSizes}
                </Select>
              </FormControl>}
              {product.category==='bracelets'&&
                <ListItem>
                  <FormControl className={classes.formControl} value={braceletSize} >
                    <InputLabel>Size</InputLabel>
                    <Select defaultValue='medium' onChange={e=>setBraceletSize(e.target.value)}>
                      <MenuItem value={'small'}>small</MenuItem>
                      <MenuItem value={'medium'}>medium</MenuItem>
                      <MenuItem value={'large'}>large</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              }
            </Grid>
            <Grid item xs={6} md={4}>

            <List>

            {product.category==='necklaces'&&chain!=='none'&&(
            <div>
              <ListItem>
                <FormControl className={classes.formControl} value={length} >
                  <InputLabel>Length</InputLabel>
                  <Select defaultValue='15' onChange={e=>setLength(e.target.value)}>
                    <MenuItem value={15}>15"</MenuItem>
                    <MenuItem value={16}>16"</MenuItem>
                    <MenuItem value={18}>18"</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <NecklaceModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} />
            </div>
          )}
          </List>
          </Grid>
          <Grid item md={5}>
          <List>
            <ListItem>
              <ListItemText>Unit Price:   <strong>${product.category==='necklaces'? (product.price+chainObj[chain]).toFixed(2) : product.price}</strong></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Total Price:   <strong>${product.category==='necklaces'? ((product.price*qty) + (chainObj[chain]*qty)).toFixed(2) : ((product.price*qty).toFixed(2))}</strong></ListItemText>
            </ListItem>
          </List>
          </Grid>

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

          </List>
          
          
          )}
          <Grid style={{marginTop:20}} item md={12}>
            <CustomButton disabled={product.countInStock===0} onClick={handleAddToBasket} text={'Add To Basket'}/>
          </Grid>

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