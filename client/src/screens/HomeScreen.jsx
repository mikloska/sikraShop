import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Grid from '@material-ui/core/Grid'
// import axios from 'axios'
import {listProducts} from '../actions/productActions'
import { Parallax, Background } from 'react-parallax';
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { makeStyles} from '@material-ui/core/styles';
// import airpods from '../../../images/airpods.jpg'

// import {DropzoneArea} from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
  Image:{
    
  }

}));

const HomeScreen = ({match}) => {
  // const handleScrollClick = () => {
  //   window[`scrollTo`]({ top: 0, behavior: `smooth` })
  // }
  // const dispatch = useDispatch()
  // const keyword = match.params.keyword
  // const pageNumber = match.params.pageNumber || 1
  // // const [products,setProducts] = useState([])
  // const productList = useSelector(state => state.productList)
  // const {loading, error, products, page, pages} = productList
  // useEffect(()=>{
  //   dispatch(listProducts(keyword, pageNumber))

  //   // axios.get('/api/products')
  //   //   .then(res => {
  //   //   setProducts(res.data);
  //   // })
  //   // .catch(err => console.log(err))
  // },[dispatch, keyword, pageNumber])


  return (
    <div >
      <Parallax
        
        blur={{ min: 15, max: -15 }}
        bgImage={'https://sikra.s3.us-east-2.amazonaws.com/Necklaces/silver-bobcat-pendant-outdoor.jpg'}
        
        bgImageAlt="bobcat"
        strength={-200}
      >
        
        <div style={{width:'100vw', height: '750px'}} />
      </Parallax>
      <Parallax
        
        blur={{ min: -15, max: 15 }}
        bgImage={'https://sikra.s3.us-east-2.amazonaws.com/Necklaces/ammonite.jpg'}
        bgImageAlt="ammonite"
        strength={-200}
      >
        
        <div style={{width:'100vw', height: '750px'}} />
      </Parallax>
      <Parallax
        
        blur={{ min: 15, max: -15 }}
        bgImage={'https://sikra.s3.us-east-2.amazonaws.com/Necklaces/owl-group.jpg'}
        bgImageAlt="owls"
        strength={-200}
      >
      <div style={{width:'100%vw', height: '750px'}} />
      </Parallax>
      <Parallax
        
        blur={{ min: 15, max: -15 }}
        bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Dragon-ring-moss.jpg'}
        bgImageAlt="dragon"
        strength={-200}
      >
        
        <div style={{width:'100vw', height: '750px'}} />
      </Parallax>
      <Parallax
        
        blur={{ min: 10, max: -15 }}
        bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/deep-forest-ring-model.jpg'}
        bgImageAlt="the dog"
        strength={-200}
      >
        
        <div style={{width:'100vw', height: '750px'}} />
      </Parallax>
      {/* <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> : 
      <Grid container spacing={6} justifyContent="center">
        {products.map((product) => (
          
          <Grid item xs={12}sm = {12} md = {6} lg = {4} xl = {3} key ={product._id} style={{textAlign:"center"}}>
            <Product product = {product} />
          </Grid>
        ))}
        
        <Paginate pages={pages} page={page} handleScrollClick={handleScrollClick} keyword={keyword ? keyword : ''}/>
        
      </Grid>} */}
    </div>
  )
}

export default HomeScreen;