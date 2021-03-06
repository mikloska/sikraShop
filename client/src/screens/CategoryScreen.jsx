import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import {Grid, Typography} from '@material-ui/core'
// import axios from 'axios'
import {listProductByCategory} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CATEGORY_LIST_RESET } from '../constants/productConstants'
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from "react-router-dom";



const CategoryScreen = ({match}) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  //Grab category from url
  const current = match.path.split('/')[1]
  useEffect(()=>{
    
    dispatch(listProductByCategory(current, pageNumber))

  },[dispatch, match, pageNumber])
  // const [products,setProducts] = useState([])
  //Grab redux category to update with current category from url in useEffect
  const productListCategory = useSelector(state => state.productListCategory)
  const {loading, error, productsCategory, catPage, catPages} = productListCategory

  let history = useHistory();
  // const [paginationPage, setpaginationPage] = useState(catPage);

  const handleScrollClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` })
  }




  const handleChange = (event, value) => {
    history.push(`/${current}/page${value}`)
    handleScrollClick()
    // setpaginationPage(value);
  };


  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      
      <Typography variant='h4' style={{marginBottom:40}}>
        {current==='necklaces' ? 'Neckalces & Pendants':current.charAt(0).toUpperCase() + current.slice(1)}
      </Typography>
      
      <Grid container spacing={6} justifyContent="center">
      {loading ? <Loader/> : error ? <Message severity='error' style={{width:'100%'}}>{error}</Message> : 
        productsCategory&&
        productsCategory.map((product) => (
          
          <Grid item xs={12}sm = {12} md = {4} lg = {4} xl = {4} key ={product._id} style={{textAlign:"center"}}>
            <Product product = {product} />
          </Grid>
        ))}
        {/* <Grid item lg={11} md={11} style={{display:'flex',justifyContent:'center'}} ><Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/></Grid> */}
      </Grid>
      {/* <Pagination count={catPages} page={catPage} onChange={handleChange}/> */}

      {catPages > 1 && (
      <Grid container justifyContent='center' style={{marginTop: 50}}> 
        <Grid item md={11} style={{display:'flex',justifyContent:'center'}}>
          <Pagination count={catPages} page={catPage} onChange={handleChange}/>
        </Grid>
      </Grid>

    )}
    </div>
  )
}

export default CategoryScreen;