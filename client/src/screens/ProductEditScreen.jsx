
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import {IconButton, Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import LabelIcon from '@material-ui/icons/Label';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct, deleteProductImage } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import {DropzoneArea} from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft:20,
    paddingRight:20
    // padding: theme.spacing(5),
    // height="100%"
  },
  paper: {
    // marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // backgroundColor:'#067e78'
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 0),
  },
}));

const ProductEditScreen = ({ match, history }) => {
  const classes = useStyles();
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState()
  const [images, setImages] = useState()
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(5)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])

  const dispatch=useDispatch()
  //Get userRegister from state and destructure what we need from it
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImages(product.image)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId, name, price, image, category, description, countInStock,
      })
    )
  };
  const uploadFileHandler = async (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const handleImageDelete = (pic) => {
    imagesArr.pop()
    dispatch(deleteProductImage({_id:productId, pic}))

  }
  let imagesArr;

  if(images!==undefined&&Array.isArray(images)){
    imagesArr = (images.map(pic=>
      <div key={pic} style={{position: 'relative'}}>
        <img style={{display:'block',width:'100%', padding:4}} src={pic} />
        {pic&&<IconButton onClick={()=>handleImageDelete(pic)} style={{color:'#d11919',zIndex:10,position:'absolute',top:0,right:0}}>
          <DeleteForeverIcon/>
        </IconButton>}
      </div>))

    }  else{
      imagesArr = (<Loader/>)
    } 




  return (
    <Container component="main" maxWidth="xs">
      <Paper pt={0} elevation={7}>
        <Card className={classes.card} >
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <LabelIcon/>
              </Avatar>
               <Typography component="h1" variant="h5">
                Edit Product
              </Typography>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
              {loading ? <Loader />: error ? <Message severity='error'>{error}</Message> :(

                <form className={classes.form} noValidate onSubmit={handleSubmit} >
                <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Name"
                  name="name" autoComplete="name" value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <TextField variant="outlined" margin="normal" required fullWidth id="price"
                    label="Price" name="price" value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  {/* {images!==undefined&&Array.isArray(images) ? images.map(pic=>
                    <div key={pic} style={{position: 'relative'}}>
                      <img style={{display:'block',width:'100%', padding:4}} src={pic} />
                      <IconButton style={{color:'#d11919',zIndex:10,position:'absolute',top:0,right:0}} onClick={()=>console.log(e.target)}>
                        <DeleteForeverIcon onClick={()=>console.log()}/>
                      </IconButton>
                    </div>) : <Loader/>} */}
                    {/* {images!==undefined&&Array.isArray(images) ? imagesArray : <Loader/>} */}
                    {imagesArr}
                  <TextField variant="outlined" margin="normal" required fullWidth id="image"
                    label="Enter Image URL" name="image" value={image? image: ''}
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  />
                  <input type='file' onChange={uploadFileHandler} id='fileUpload' />
                  {/* <DropzoneArea onChange={uploadFileHandler}/> */}
                  {uploading && <Loader />}
                  <FormControl className={classes.formControl} fullWidth value={category} style={{marginTop:20}}>
                    <InputLabel>Category</InputLabel>
                    <Select defaultValue={''} onChange={e=>setCategory(e.target.value)}>
                      <MenuItem value={'necklaces'}>Necklaces & Pendants</MenuItem>
                      <MenuItem value={'earrings'}>Earrings</MenuItem>
                      <MenuItem value={'ring'}>Rings</MenuItem>
                      <MenuItem value={'bracelets'}>Bracelets</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} fullWidth value={countInStock} style={{marginTop:20}}>
                    <InputLabel>Count in Stock</InputLabel>
                    <Select defaultValue='5' onChange={e=>setCountInStock(e.target.value)}>
                      {[...Array(11)].map((x,i)=> (
                        <MenuItem key={i+1} value={i}>{i}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField style={{marginTop:20}} fullWidth multiline aria-label="empty textarea" value={description} 
                    onChange={(e) => {setDescription(e.target.value);}} placeholder={'Description'} name="description"
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Update
                  </Button>
                </form>
              )}
  

            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
  );
}

export default ProductEditScreen