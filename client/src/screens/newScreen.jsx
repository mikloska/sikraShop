import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Button, List, ListItem, ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, Grid, Paper, Typography} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
// import { createOrder } from '../actions/orderActions'
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
    textAlign:'center'
  },
  
}))


const OrderScreen = ({ history }) => {
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

  // const orderCreate = useSelector((state) => state.orderCreate)
  // const { order, success, error } = orderCreate

  // useEffect(() => {
    // if (success) {
    //   history.push(`/order/${order._id}`)
    //   dispatch({ type: USER_DETAILS_RESET })
    //   dispatch({ type: ORDER_CREATE_RESET })
    // }
    // eslint-disable-next-line
  // }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      // createOrder({
      //   orderItems: basket.basketItems,
      //   shippingAddress: basket.shippingAddress,
      //   paymentMethod: basket.paymentMethod,
      //   itemsPrice: basket.itemsPrice,
      //   shippingPrice: basket.shippingPrice,
      //   taxPrice: basket.taxPrice,
      //   totalPrice: basket.totalPrice,
      // })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 tab={3} />
      <Grid container justifyContent="center" spacing={6}>
        {/* Left side */}
        <Grid item md={5}>
          <Paper elevation={7}>
          <Typography>
            <strong>Shipping Address: </strong>{basket.shippingAddress.address}, {basket.shippingAddress.city}{' '}
              {basket.shippingAddress.zip},{' '}
              {basket.shippingAddress.country}
          </Typography>
          <Typography>
            <strong>Payment Method: </strong>
            {basket.paymentMethod}
          </Typography>
          <Typography>
            <strong>Orders: </strong>
          </Typography>
          {basket.basketItems.length === 0 ? (
              <Message>Your basket is empty</Message>
            ) : (
              <List  >
                {basket.basketItems.map((item, index) => (
                  <ListItem key={index}>
                    <Grid container>
                      {/* <Grid item sm={1} md={3}>
                        <img src={item.image} alt={item.name} className={classes.Media}/>
                      </Grid> */}
                      <Grid item>
                        <RouterLink to={`/product/${item.product}`}>
                          {item.name}
                        </RouterLink>
                      </Grid>
                      <Grid item md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Grid>
                    </Grid>
                  </ListItem>
                  ))}
                  </List>
                )}
          </Paper>

        </Grid>

        {/* Right side */}
        <Grid item md={5}>
          <Paper elevation={7}>
            <Typography variant='h2'>
              Order Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <strong>Items: </strong>${basket.itemsPrice}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Shipping: </strong>${basket.shippingPrice}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Tax: </strong>${basket.taxPrice}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Total: </strong>${basket.totalPrice}
                </ListItemText>
              </ListItem>
            </List>
          </Paper>

        </Grid>
     
      </Grid>
    </>
  )
}

export default OrderScreen






