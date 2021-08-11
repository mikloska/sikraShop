import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Button, List, ListItem, ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, Grid, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants'
const useStyles = makeStyles((theme) => ({
  submit: {
    
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
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

const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket)

  if (!basket.shippingAddress.address) {
    history.push('/shipping')
  } else if (!basket.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  basket.itemsPrice = addDecimals(
    basket.basketItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  basket.shippingPrice = addDecimals(basket.itemsPrice > 100 ? 0 : 100)
  basket.taxPrice = addDecimals(Number((0.15 * basket.itemsPrice).toFixed(2)))
  basket.totalPrice = (
    Number(basket.itemsPrice) +
    Number(basket.shippingPrice) +
    Number(basket.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
      // dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        shippingAddress: basket.shippingAddress,
        paymentMethod: basket.paymentMethod,
        itemsPrice: basket.itemsPrice,
        shippingPrice: basket.shippingPrice,
        taxPrice: basket.taxPrice,
        totalPrice: basket.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 tab={3} />
      <Grid container justifyContent="center" alignItems="center" spacing={6}>
        <Grid item md={6} sm={10} xs={12}>
        <Paper elevation={7} className={classes.paper}>
          <List  >
            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Shipping Address: </strong>
                  {' '}{basket.shippingAddress.address} {basket.shippingAddress.city}{' '}
                  {basket.shippingAddress.zip},{' '}
                  {basket.shippingAddress.country}
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Payment Method: </strong>
                {' '}{basket.paymentMethod}
                </Grid>
                </Grid>
              </ListItemText>
            </ListItem>


            <ListItem>
              <ListItemText>
                {/* <strong>Items:</strong> */}
                  {basket.basketItems.length === 0 ? (
                <Message>Your basket is empty</Message>
              ) : (
                <Grid container justifyContent="center" >
                <Grid item>
                {/* <List  > */}
                  {basket.basketItems.map((item, index) => (
                    <ListItemText style={{padding:10}} key={index}>
                      {/* <Grid container> */}
                        {/* <Grid item sm={2} md={1}>
                          <img src={item.image} alt={item.name} className={classes.Media}/>
                        </Grid> */}
                        {/* <Grid item> */}
                          <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
                            {item.name}
                          </RouterLink>
                        {/* </Grid>
                        <Grid item md={4}> */}
                          :{'  '}{item.qty} x ${item.price} = ${item.qty * item.price}
                        {/* </Grid>
                      </Grid> */}
                    </ListItemText>
                  ))}
                {/* </List> */}
                </Grid>

                </Grid>
              )}

              </ListItemText>
            </ListItem>

          </List>
          </Paper>
        </Grid>















        <Grid item md={5} sm={10} xs={12}>
          <Paper elevation={7} className={classes.paper}>
            <List  >
              <ListItem>
                <h2>Order Summary</h2>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Items: </strong> ${basket.itemsPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Shipping: </strong> ${basket.shippingPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Tax: </strong> ${basket.taxPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Total: </strong> ${basket.totalPrice}</Grid>
                </Grid>
              </ListItem>



              <ListItem>
                {error && <Message severity='error'>{error}</Message>}
              </ListItem>
              <ListItem>
                <Button  className={classes.submit} 
                  // type='button'
                  disabled={basket.basketItems === 0}
                  onClick={placeOrderHandler}
                  color='primary'
                  type="submit" fullWidth variant="contained" className={classes.submit} 
                >
                  Place Order
                </Button>
              </ListItem>
            </List>

          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default PlaceOrderScreen