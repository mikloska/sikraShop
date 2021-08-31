import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Grid, ListItem, List, Paper, FormControl, Select, Button, MenuItem, Typography, IconButton, InputLabel} from '@material-ui/core/';
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
  const itemCount = useSelector(state => state.itemCount)
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const updateBasket = (e, item) => {
    dispatch(changeBadge(total))
    dispatch(addToBasket(item.product, Number(e)))
  }
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket)
  const { basketItems } = basket
  const total = basketItems.reduce((acc, curr) => acc + curr.qty, 0)

  useEffect(() => {
    dispatch(changeBadge(total))
    // console.log(initial)
    // console.log(match.params.id)
    // console.log('quantity: ', 7, 'productId: ',productId)
    // dispatch(addToBasket('60f729e897ee944ab06f2346', 7))
    if (productId) {
      // console.log('productId: ', productId)
      
      dispatch(addToBasket(productId, qty))
      
      // dispatch(changeBadge(basketItems.reduce((acc, item) => acc + item.qty, 0)))
    }
  }, [dispatch, productId, qty])

  const removeFromBasketHandler = (id) => {
    dispatch(removeFromBasket(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    
      <Paper elevation ={7} style={{padding:30}} >
      {/* <Grid item md={8}> */}
        <Typography style={{marginTop:0}} variant='h4'> Shopping Basket</Typography>
        {basketItems.length === 0 ? (
        <List>
          <ListItem>
            <Message style={{width:'100%'}}>
              Your basket is empty <RouterLink to='/'>Go Back</RouterLink>
            </Message>
          </ListItem>
        </List>
        ) : (
   
          <Grid container spacing={6} justifyContent="center" >
            {basketItems.map((item) => (
          
            <Grid item xs={12}sm = {12} md = {6} lg = {3} xl = {3} key={item.product}>
              <Paper elevation={7} className = {classes.Card} ml={6} >
              <RouterLink to={`/product/${item.product}`} variant='h6' className={classes.Link}>
                {item.image ? <img src={item.image[0]} className={classes.Media}/> : <Loader/>} 
                <Typography variant = "subtitle2">
                  <strong >{item.name}</strong>
                </Typography>
      
                <Typography>
                  <strong>{item.price}</strong>
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
                <IconButton onClick={() => removeFromBasketHandler(item.product)} style={{bottom:-10, marginLeft: 20}}> 
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
    </Paper>
  )
}

export default BasketScreen