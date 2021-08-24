import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, IconButton, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
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
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

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
  const dispatch = useDispatch()
  const classes = useStyles();
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInformation || !userInformation.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, history, userInformation, successDelete, successCreate, createdProduct])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //Delete product here
      dispatch(deleteProduct(id))
    }
  }
  

  return(
    <div>
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
      {products.map((product) => (
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
              <IconButton onClick={() => deleteHandler(product._id)}><DeleteForeverIcon/></IconButton>
            </div>
          </StyledTableCell>
          
        </StyledTableRow>
      ))}
      </TableBody>
    </Table>
    </TableContainer>
    )}
  </div>

  )

}

export default ProductListScreen