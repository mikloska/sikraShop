import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Grid from '@material-ui/core/Grid'
// import axios from 'axios'
import {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { makeStyles} from '@material-ui/core/styles';
import {getUserDetails} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import HomeGallery from '../components/HomeGallery'
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import airpods from '../../../images/airpods.jpg'

// import {DropzoneArea} from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
  Image:{
    
  }

}));

const HomeScreen = ({match}) => {
  const dispatch=useDispatch()
  const userLogin=useSelector(state=>state.userLogin)
  const {loading, error, userInformation}=userLogin
  const showSmall = useMediaQuery('(min-width:600px) and (max-width:900px)');
  const showMobile = useMediaQuery('(max-width:600px)');
  useEffect(()=>{
    if(userInformation){
      dispatch(listMyOrders())
      dispatch(getUserDetails('profile'))
    } 
    if(showMobile) console.log('mobile width')
    if(showSmall) console.log('small width')
    if(!showMobile && !showSmall) console.log('regular width')
  })
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
    <>
      <HomeGallery w={showMobile ? 100: showSmall ? 2 : 100} h={showMobile ? 500 : showSmall ? 600 : 900}/>
    </>
    
      // <h1>Latest Products</h1>
      // {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> : 
      // <Grid container spacing={6} justifyContent="center">
      //   {products.map((product) => (
          
      //     <Grid item xs={12}sm = {12} md = {6} lg = {4} xl = {3} key ={product._id} style={{textAlign:"center"}}>
      //       <Product product = {product} />
      //     </Grid>
      //   ))}
        
      //   <Paginate pages={pages} page={page} handleScrollClick={handleScrollClick} keyword={keyword ? keyword : ''}/>
        
  )
}

export default HomeScreen;