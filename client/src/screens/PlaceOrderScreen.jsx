import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Box, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, Grid, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { getOrderDetails, payOrder, deliverOrder,} from '../actions/orderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {ORDER_PAY_RESET,  ORDER_DELIVER_RESET } from '../constants/orderConstants'
import Loader from '../components/Loader'

// import { ORDER_CREATE_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants'
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

const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const states=useSelector(state=>state.states)
  const basket = useSelector((state) => state.basket)
  const [sdkReady, setSdkReady] = useState(false)

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
  const taxRate = 
    basket.shippingAddress.city.toUpperCase().includes('NEW YORK')&&basket.shippingAddress.state.toUpperCase().includes('NEW YORK')?.08875
    :basket.shippingAddress.city.toUpperCase().includes('LOS ANGELES')?.095
    :basket.shippingAddress.city.toUpperCase().includes('SAN FRANCISCO')?.08625
    :(basket.shippingAddress.state!==''&&!basket.shippingAddress.city.toUpperCase().includes('NEW YORK')&&!basket.shippingAddress.city.toUpperCase().includes('Los Angeles')&&!basket.shippingAddress.city.toUpperCase().includes('San Francisco'))?states[basket.shippingAddress.state]
    :basket.shippingAddress.province!==''&&basket.shippingAddress.province.toUpperCase()!=='ONTARIO'?.015
    :basket.shippingAddress.province.toUpperCase()==='ONTARIO'?.013
    :0
  basket.shippingPrice = addDecimals(basket.itemsPrice > 100 ? 0 : 100)
  basket.taxPrice = addDecimals(Number((taxRate * basket.itemsPrice).toFixed(2)))
  basket.totalPrice = (
    Number(basket.itemsPrice) +
    Number(basket.shippingPrice) +
    Number(basket.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (success) {
      // dispatch(payOrder(order._id, paymentResult))
      history.push(`/orders/${order._id}`)
      // dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_CREATE_RESET })
    }
    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [history, success])
  const successPaymentHandler = (paymentResult) => {
    
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        shippingAddress: basket.shippingAddress,
        paymentMethod: basket.paymentMethod,
        itemsPrice: basket.itemsPrice,
        shippingPrice: basket.shippingPrice,
        taxPrice: basket.taxPrice,
        totalPrice: basket.totalPrice,
        paymentResult: paymentResult
      })
    )
    dispatch(payOrder(order._id, paymentResult))
    // console.log(paymentResult)
    // dispatch(payOrder(orderId, paymentResult))
  }
  const placeOrderHandler = () => {
    // dispatch(
    //   createOrder({
    //     orderItems: basket.basketItems,
    //     shippingAddress: basket.shippingAddress,
    //     paymentMethod: basket.paymentMethod,
    //     itemsPrice: basket.itemsPrice,
    //     shippingPrice: basket.shippingPrice,
    //     taxPrice: basket.taxPrice,
    //     totalPrice: basket.totalPrice,
    //   })
    // )
  }

  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      <CheckoutSteps step1 step2 step3 tab={2} />
      <Grid container justifyContent="center" spacing={6}>
        <Grid item md={6} sm={10} xs={12}>
        <Paper elevation={7} className={classes.paper} style={{padding:20}}>
          <List  >
            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Shipping Address: </strong>
                  {' '}{basket.shippingAddress.address} {basket.shippingAddress.city},{' '}
                  {basket.shippingAddress.state!==''&& basket.shippingAddress.state}{basket.shippingAddress.province!==''&& basket.shippingAddress.province}{' '}
                  {basket.shippingAddress.zip}{' '}{basket.shippingAddress.country}
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


            {basket.basketItems.length === 0 ? (
              <ListItem><Message>Your basket is empty</Message></ListItem>
            ) : (
            <Table  className={classes.table} style={{marginTop:20}}>
              <TableHead>
                <StyledTableRow>
                  {/* <TableCell>IMG</TableCell> */}
                  <StyledTableCell>ITEM</StyledTableCell>
                  <StyledTableCell>QTY</StyledTableCell>
                  <StyledTableCell>PRICE</StyledTableCell>
                  <StyledTableCell>TOTAL</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {basket.basketItems.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>

                    <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
                    {item.image ? <Box className={classes.Box}><img src={item.image[0]} alt={item.name} className={classes.Media}/></Box> : <Loader/>}
                      {item.name}
                    </RouterLink>
                    {item.chain==='silver'&&` -${item.length}" silver chain`}
                    {item.chain==='cord'&&` -${item.length}" cord`}
                    {item.size>0&&` -size ${item.size}`}
                  </StyledTableCell>
                  {/* <TableCell><Box className={classes.Box}><img src={item.image} alt={item.name} className={classes.Media}/></Box></TableCell> */}
                  <StyledTableCell>{item.qty}</StyledTableCell>
                  <StyledTableCell>${item.price.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>${(item.qty * item.price).toFixed(2)}</StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>



            </Table>
            )}

          </List>
          </Paper>
        </Grid>















        <Grid item md={5} sm={10} xs={12}>
          <Paper elevation={7} className={classes.paper}>
            <List  >
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><h2>Order Summary</h2></Grid>
                </Grid>
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
              {!sdkReady && (
                    <Loader />
                  )} 
              {( basket.paymentMethod==='PayPal' &&
                    <PayPalButton
                      amount={basket.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
              </ListItem>
              {/* <ListItem>
                <Button  className={classes.submit} 
                  // type='button'
                  disabled={basket.basketItems === 0}
                  onClick={placeOrderHandler}
                  color='primary'
                  type="submit" fullWidth variant="contained" className={classes.submit} 
                >
                  Place Order
                </Button>
              </ListItem> */}
            </List>

          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default PlaceOrderScreen