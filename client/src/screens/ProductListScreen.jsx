import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, IconButton, Grid, Box, Paper, Tabs,Tab, Typography, Radio, RadioGroup} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {listProducts, deleteProduct, createProduct, listProductByCategory} from '../actions/productActions'
import { PRODUCT_CREATE_RESET, PRODUCT_CATEGORY_LIST_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const useStyles = makeStyles((theme) => ({
  submit: {
    
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  Box: {
    width:50
  },
  Media: {
    height: 'auto',
    maxWidth:'100%'
  },
  paper: {
    // marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    // background:'linear-gradient(120deg, #28ccc4, #067e78)',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const ProductListScreen = ({history, match}) => {
  const [category, setCategory]=useState('')
  const pageNumber = match.params.pageNumber || 1  
  //Grab category from url
  const current = match.path.split('/admin/productlist')[1]
  //Grab redux category to update with current category from url in useEffect
  const productListCategory = useSelector(state => state.productListCategory)
  const {loading:loadingCat, error: catErr, productsCategory, catPage, catPages} = productListCategory
  const dispatch = useDispatch()
  const classes = useStyles();
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin

  const handleScrollClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` })
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  useEffect(() => {
    // console.log('current: ',current)
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInformation || !userInformation.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      dispatch({type:PRODUCT_CATEGORY_LIST_RESET})
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } 
    else {
      if(current.includes('necklaces')||current.includes('earrings')||current.includes('rings')||current.includes('bracelets')){
        dispatch(listProductByCategory(current.split('/')[1], pageNumber))
      }
      // else{
      //   dispatch(listProducts('', pageNumber))
      // }
      dispatch({type:PRODUCT_CATEGORY_LIST_RESET})
      //Empty string bc first arg is keyword
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInformation, successDelete, successCreate, createdProduct, match, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //Delete product here
      dispatch(deleteProduct(id))
    }
  }
  const sort=(route)=>{
    if(route==='all'){
      dispatch({type:PRODUCT_CATEGORY_LIST_RESET})
      dispatch(listProducts('', pageNumber))
      history.push('/admin/productlist')
    }
    else{
      history.push(`/admin/productlist/${route}`)
    }
  }
  

  return(
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      <Grid container spacing={10}>
        <Grid item md={6} sm={6}>
          <Typography variant='h4'>Products</Typography>
        </Grid>
        <Grid item md={6} sm={6} >
          <Button onClick={createProductHandler} style={{float:'right', color:'white',backgroundColor:'#067e78',}}>
            + Create Product
          </Button>
        </Grid>
      </Grid>
      {/* <Grid container spacing={10}> */}
        <RadioGroup value={(current.includes('necklaces')||current.includes('earrings')||current.includes('rings')||current.includes('bracelets'))?current.split('/')[1]:'all'} onChange={(e) => sort(e.target.value)} row>
          <FormControlLabel control={<Radio  id='necklaces' value='all' name="category" />} label='All' />
          <FormControlLabel control={<Radio  id='necklaces' value='necklaces' name="category" />} label='Necklaces & Pendants' />
          <FormControlLabel control={<Radio  id='earrings' value='earrings' name="category" />} label='Earrings' />
          <FormControlLabel control={<Radio  id='rings' value='rings' name="category" />} label='Rings' />
          <FormControlLabel control={<Radio  id='bracelets' value='bracelets' name="category" />} label='Bracelets' />
        </RadioGroup>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message severity='error'>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message severity='error'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
      <TableContainer style={{overflowX:'scroll'}}>
      <Table className={classes.table} style={{marginTop:20}}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>NAME</StyledTableCell>
          <StyledTableCell>PRICE</StyledTableCell>
          <StyledTableCell>CATEGORY</StyledTableCell>
          <StyledTableCell></StyledTableCell>

        </StyledTableRow>
      </TableHead>
      <TableBody>
      {/* Display products by category if displaying by cat, if not display all */}
      {productsCategory && productsCategory.length>0?(
        productsCategory.map((product) => (
          <StyledTableRow key={product._id}>
            <StyledTableCell>
              <RouterLink style={{color:'#067e78'}} to={`/product/${product._id}`}>{product._id}</RouterLink>
            </StyledTableCell>
            <StyledTableCell>{product.name}</StyledTableCell>
            <StyledTableCell>${product.price}</StyledTableCell>
            <StyledTableCell>{product.category}</StyledTableCell>
            <StyledTableCell>
              <div style={{float:'right'}}>
                <RouterLink to={`/admin/product/${product._id}/edit`}>
                  <IconButton ><EditIcon/></IconButton>
                </RouterLink>
                <IconButton onClick={() => deleteHandler(product._id)}><DeleteForeverIcon style={{color:'#d11919'}}/></IconButton>
              </div>
            </StyledTableCell>
            
          </StyledTableRow>
        ))

      ):
      products.map((product) => (
        <StyledTableRow key={product._id}>
          <StyledTableCell>
            <RouterLink style={{color:'#067e78'}} to={`/product/${product._id}`}>{product._id}</RouterLink>
          </StyledTableCell>
          <StyledTableCell>{product.name}</StyledTableCell>
          <StyledTableCell>${product.price}</StyledTableCell>
          <StyledTableCell>{product.category}</StyledTableCell>
          <StyledTableCell>
            <div style={{float:'right'}}>
              <RouterLink to={`/admin/product/${product._id}/edit`}>
                <IconButton ><EditIcon/></IconButton>
              </RouterLink>
              <IconButton onClick={() => deleteHandler(product._id)}><DeleteForeverIcon style={{color:'#d11919'}}/></IconButton>
            </div>
          </StyledTableCell>
          
        </StyledTableRow>
      ))}
      </TableBody>
    </Table>
    </TableContainer>
    )}
    {/* {((!current.includes('necklaces')||!current.includes('earrings')||!current.includes('rings')||!current.includes('bracelets')))? ( */}
    <Grid container justifyContent='center' style = {{marginTop: 30}}>
      <Paginate keyword={current.includes('necklaces')?'necklaces':current.includes('earrings')?'earrings':current.includes('rings')?'rings':current.includes('bracelets')?'bracelets':''} 
      // count={(current.includes('necklaces')||current.includes('earrings')||current.includes('rings')||current.includes('bracelets'))?catPages:0}
      pages={(!current.includes('necklaces')&&!current.includes('earrings')&&!current.includes('rings')&&!current.includes('bracelets'))?pages:catPages} 
      page={(!current.includes('necklaces')||!current.includes('earrings')||!current.includes('rings')||!current.includes('bracelets'))?page:catPage} isAdmin={true} handleScrollClick={handleScrollClick} />
    </Grid>
    {/* ):
    (current.includes('necklaces')||current.includes('earrings')||current.includes('rings')||current.includes('bracelets'))? (
    <Grid container justifyContent='center' style = {{marginTop: 30}}>
      <Paginate pages={catPages} page={catPage} keyword={current} isAdmin={true} handleScrollClick={handleScrollClick} />
    </Grid>
    ):null} */}
  </div>

  )

}

export default ProductListScreen