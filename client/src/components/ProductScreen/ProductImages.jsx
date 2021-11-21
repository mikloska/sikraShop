import React, {useState, useEffect} from 'react'
import ReactImageMagnify from 'react-image-magnify';
import Loader from '../../components/Loader'
import { makeStyles } from '@material-ui/core/styles';
import {listProductDetails} from '../../actions/productActions'
import{Button}  from '@material-ui/core/'
import { useDispatch } from 'react-redux';
import axios from 'axios'

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

const ProductImages = ({product, rearrange, setRearrange, imageArr, setImageArr, setNewImages}) => {
  const [currentImage, setCurrentImage] = useState('')
  const [firstRender, setFirstRender] = useState(true)
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(product.image) setCurrentImage(product.image[0])
  },[dispatch])
  const updateImage = (pic) =>{
    setCurrentImage(pic)
    setFirstRender(false)
  }
  const rearrangeImages = (image) =>{
    if(!imageArr.includes(image)) setImageArr(oldArr=>[...oldArr,image])
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