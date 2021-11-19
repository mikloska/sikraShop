import React, {useState} from 'react'
import ReactImageMagnify from 'react-image-magnify';
import Loader from '../../components/Loader'
import { makeStyles } from '@material-ui/core/styles';
import {listProductDetails, createProductReview} from '../../actions/productActions'
import{Grid, Typography, List, ListItem, ListItemText, Radio,Divider, RadioGroup, FormControl, FormLabel, FormControlLabel,
  Select, MenuItem, InputLabel, TextField, Button}  from '@material-ui/core/'
  import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme)=>({
  AdminButtons:{
    marginLeft:30, 
    color:'white',
    backgroundColor:'#067e78'
   },
  Image: {
    width:'100px', 
    paddingRight:4, 
    paddingTop:4,
  },
}))

const ProductImages = ({product, rearrange, setRearrange}) => {
  const [imageArr, setImageArr] = useState([])
  const [currentImage, setCurrentImage] = useState('')
  const [firstRender, setFirstRender] = useState(true)
  const classes = useStyles()
  const dispatch = useDispatch()
  const updateImage = (pic) =>{
    setCurrentImage(pic)
    setFirstRender(false)
  }
  const rearrangeImages = (image) =>{
    if(!imageArr.includes(image)) setImageArr(oldArr=>[...oldArr,image])
  }
  const setNewImages= async ()=>{
    if(product.image.length===imageArr.length){
      await axios.put(`/api/products/images/${product._id}`, {imageArr:imageArr})
      dispatch(listProductDetails(match.params.id))
      setRearrange(false)
      setImageArr([])
    }
  }
  return(
    <div>
      {product.image&&firstRender===true ? 
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
      }
      {rearrange&& (
      <div style={{borderBottom:30}}>
        <Button onClick={()=>setNewImages()} className={classes.AdminButtons}>Save</Button>
        <Button onClick={()=>{setRearrange(false); setImageArr([])}} className={classes.AdminButtons}>Cancel</Button>
      </div>
      )}
      {imageArr.length>0&& imageArr.map(image=>(
        <img src={image} key={`${image}alt`} className={classes.Image} alt={product.name}/>
      ))}
    </div>
  )
}

export default ProductImages