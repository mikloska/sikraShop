import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Grid, ListItem, List, Container, Paper, FormControl, Select, Button, MenuItem, Typography, IconButton, InputLabel} from '@material-ui/core/';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Message from '../components/Message'
import { addToBasket, removeFromBasket } from '../actions/basketActions'
import { changeBadge } from '../actions/itemCountActions'
import Loader from '../components/Loader'

const useStyles = makeStyles((theme)=>({
  CheckoutButton: {
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  Card: {
    textAlign: 'center'
  },
  Link: {
    '&:hover':{opacity:0.5, color: '#067e78'},
    color: 'inherit', 
    textDecoration: 'inherit'
  },
  formControl: {
    minWidth: 100
  },

  Media: {
    height: 'auto',
    maxWidth:'100%'
  }
}));

const BasketScreen = ({ match, location, history }) => {
  const classes=useStyles()
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('qty=')[1]) : 1
  const chain = location.search.match(/\s*(?:chain=[a-zA-Z])\s*/) ? location.search.match(/\s*(?:chain=[a-zA-Z]+)\s*/)[0].split('chain=')[1] : ''
  const length = location.search.match(/\s*(?:length=\d)\s*/) ? location.search.match(/\s*(?:length=\d+)\s*/)[0].split('length=')[1] : 0
  const size = location.search.match(/\s*(?:size=\d)\s*/) ? location.search.match(/\s*(?:size=[+-]?([0-9]+\.?[0-9]*|\.[0-9]+))\s*/)[0].split('size=')[1] : 0
  const updateBasket = (e, item) => {
    dispatch(changeBadge(total))
    dispatch(addToBasket(item.product, Number(e), item.chain, item.length, item.size, item.category))
  }
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket)
  const { basketItems } = basket
  const total = basketItems.reduce((acc, curr) => acc + curr.qty, 0)


  useEffect(() => {
    if(chain && chain!=='') console.log('chain: ', chain)
    if(length>0) console.log('length: ', length)
    if(size>0) console.log('size: ', size)

    dispatch(changeBadge(total))
    if (productId) {
      // dispatch(addToBasket(productId, qty, chain, length, size))

    }
  }, [dispatch, productId, qty])

  // item.product, Number(e), item.chain, item.length, item.size, item.category
  const removeFromBasketHandler = (id, chain, length, size) => {
    // console.log(id, chain, length, size)
    dispatch(removeFromBasket(id, chain, length, size))
    // history.push('/basket')
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
      <Container style={{marginTop:35, marginBottom: 45, padding:20}}>
      {/* <Grid item md={8}> */}
        <Typography style={{marginBottom:20}} variant='h4'> Shopping Basket</Typography>
        {basketItems.length === 0 ? (
        <List>
          <ListItem>
            <Message style={{width:'100%'}}>
              Your basket is empty
            </Message>
          </ListItem>
        </List>
        ) : (
   
          <Grid container spacing={6} justifyContent="center" >
            {basketItems.map((item,ind) => (
          
            <Grid item xs={12}sm = {12} md = {4} lg = {4} xl = {4} key={item.product+item.length+item.size+item.chain}>
              <Paper elevation={7} className = {classes.Card} ml={6} >
              <RouterLink to={`/product/${item.product}`} variant='h6' className={classes.Link}>
                {item.image ? <img src={item.image[0]} className={classes.Media}/> : <Loader/>} 
                <Typography variant = "subtitle2">
                  <strong >{item.name}</strong>
                 {item.category==='rings'&&` size ${item.size}`}
                 {(item.category==='necklaces'&&item.chain==='silver')&&` ${item.length}" ${item.chain} chain`}
                 {(item.category==='necklaces'&&item.chain==='cord')&&` ${item.length}" ${item.chain}`}
                   
                </Typography>
      
                <Typography>
                  <strong>${item.price.toFixed(2)}</strong>
                </Typography>
              </RouterLink>
              <div style={{padding:20}}>
                <FormControl className={classes.formControl} >
                  <InputLabel>Quantity</InputLabel>
                  <Select value={item.qty} onChange={(e) =>
                  updateBasket(e.target.value, item)}>
              
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <MenuItem key={x + 1} value={x + 1}>
                      {x + 1}
                    </MenuItem>))}
                  </Select>
                </FormControl>
                <IconButton onClick={() => removeFromBasketHandler(item.product, item.chain, item.length, item.size)} style={{bottom:-10, marginLeft: 20}}> 
                  <DeleteForeverIcon style={{color:"#d11919"}}/>
                </IconButton>
                </div>
              </Paper>
            </Grid>
      
            ))}
            </Grid>

        )}
      <Grid container style={{marginTop:50}} justifyContent="center"> 
      <Grid item md={4}>
        <Paper elevation={7} style={{ display: "flex", justifyContent: "center" }}>
          <List>
            <ListItem>
              <h2>
                Subtotal: $
              {basketItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              </h2>
            </ListItem>
            <ListItem style={{ display: "flex", justifyContent: "center", marginBottom:20 }}>
              <Button
                type='button'
                color='primary'
                variant="contained"
                disabled={basketItems.length === 0}
                onClick={checkoutHandler}
                className={classes.CheckoutButton}
              >
                Proceed To Checkout
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Grid>
     </Grid>
    </Container>
  )
}

export default BasketScreen