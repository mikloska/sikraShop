import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Box, List, ListItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, Grid, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { getOrderDetails, payOrder, payGuestOrder, shipOrder,createOrder, createGuestOrder } from '../actions/orderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {ORDER_PAY_RESET,  ORDER_SHIP_RESET,  ORDER_CREATE_RESET } from '../constants/orderConstants'
import {BASKET_RESET} from '../constants/basketConstants'
import Loader from '../components/Loader'



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
    // margin: theme.spacing(3, 0, 2),
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
  form: {
    width: '200px',
    // marginTop: theme.spacing(1),
  },
  
}))

const PlaceOrderScreen = ({ history }) => {
  const guest=useSelector(state=>state.guest.guestCheckout)
  const classes = useStyles();
  const dispatch = useDispatch()
  const states=useSelector(state=>state.states)
  const basket = useSelector((state) => state.basket)
  const [sdkReady, setSdkReady] = useState(false)
  const [discount, setDiscount] = useState(0)

  // if (!basket.shippingAddress) {
  //   history.push('/shipping')
  // } else if (!basket.paymentMethod) {
  //   history.push('/payment')
  // }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  basket.itemsPrice = addDecimals(
    basket.basketItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const taxRate = 
    //Had to add this conditional to check if there is a basket shippingAddress to prevent crash if user refreshes
    (basket.shippingAddress)&&(
    // basket.shippingAddress.country!=='United States'&&basket.shippingAddress.country!=='Canada'?0:
    basket.shippingAddress.city.toUpperCase().includes('NEW YORK')&&basket.shippingAddress.state.toUpperCase().includes('NEW YORK')?.08875
    :basket.shippingAddress.city.toUpperCase().includes('LOS ANGELES')?.095
    :basket.shippingAddress.city.toUpperCase().includes('SAN FRANCISCO')?.08625
    :(basket.shippingAddress.state!==''&&!basket.shippingAddress.city.toUpperCase().includes('NEW YORK')&&!basket.shippingAddress.city.toUpperCase().includes('LOS ANGELES')&&!basket.shippingAddress.city.toUpperCase().includes('SAN FRANCISCO'))?states[basket.shippingAddress.state]
    :basket.shippingAddress.country==='Canada'&&basket.shippingAddress.province!=='Ontario'?.015
    :basket.shippingAddress.province==='Ontario'?.013
    :0)
  basket.shippingPrice = (basket.shippingAddress)&&(basket.shippingAddress.country==='United States'?0:basket.shippingAddress.country==='Canada'?addDecimals(13):basket.shippingAddress.country==='United Kingdom'?addDecimals(16):addDecimals(18))
  // basket.shippingPrice = addDecimals(basket.itemsPrice > 100 ? 0 : 100)
  basket.taxPrice = addDecimals(Number((taxRate * basket.itemsPrice).toFixed(2)))
  basket.totalPrice = (
    Number(basket.itemsPrice) +
    Number(basket.shippingPrice) +
    Number(basket.taxPrice)
  ).toFixed(2)
  const [promoCode, setPromoCode]=useState('')
  const [promoPercentage, setPromoPercentage]=useState(0)
  const [promoError, setPromoError]=useState(null)
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  const userLogin=useSelector((state)=>state.userLogin)
  const {userInformation} = userLogin

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
  const handleCodeSubmit=async(e)=>{
    e.preventDefault()
    const discountPercentage=await axios.get(`/api/promocode/${promoCode}`)
    if(discountPercentage.data==='Invalid Code'){
      setPromoError(discountPercentage.data)
    }else{
      setPromoError(null)
      setPromoCode(discountPercentage.data.promoCode)
      setPromoPercentage(discountPercentage.data.percentage)
    }
    // console.log(discountPercentage)
    // setDiscount(discountPercentage.percentage)
    setPromoCode('')
  }

  useEffect(() => {
    if (!basket.shippingAddress) history.push('/shipping')
    
    if (success) {

      // dispatch({ type: USER_DETAILS_RESET })
     
      // dispatch(payOrder(order._id, paymentResult))
      if(!guest){
        axios.post('/api/email/order', {usersName:userInformation.name,userEmail:userInformation.email,price:basket.totalPrice, orderId:order._id, guest:guest})
        history.push(`/orders/${order._id}`)
      } 
      
      if(guest){
        axios.post('/api/email/order', {usersName:basket.guestInfo.name,userEmail:basket.guestInfo.email,price:basket.totalPrice, orderId:order._id, guest:guest})
        history.push(`/orders/${order._id}/guest`)
      } 
      axios.post('/api/email/ordernotification', {orderId:order._id})


      // // dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_CREATE_RESET })
    }
    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [history, success])
  const successPaymentHandler = (paymentResult) => {
    if(guest){
      // dispatch({type: BASKET_RESET})
      // dispatch({type: ORDER_CREATE_RESET})
      dispatch(
        createGuestOrder({
          guest:basket.guestInfo.name,
          email:basket.guestInfo.email,
          orderItems: basket.basketItems,
          shippingAddress: basket.shippingAddress,
          paymentMethod: basket.paymentMethod,
          itemsPrice: basket.itemsPrice,
          shippingPrice: basket.shippingPrice,
          taxPrice: basket.taxPrice,
          totalPrice: basket.totalPrice,
          paymentResult: paymentResult
        })
    )}
    if(guest) dispatch(payGuestOrder(order._id, paymentResult))
    
    if(!guest){
      // dispatch({type: BASKET_RESET})
      // dispatch({type: ORDER_CREATE_RESET})
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
    )}
    if(!guest) dispatch(payOrder(order._id, paymentResult))
    
    // 
    // console.log(paymentResult)
    // dispatch(payOrder(orderId, paymentResult))
    // dispatch({type: BASKET_RESET})
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
                  <Grid item>
                    {guest?basket.guestInfo.name:userInformation.name}
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            {basket.shippingAddress&&
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
            </ListItem>}

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

        <Grid item md={6} sm={10} xs={12}>

          <Paper elevation={7} className={classes.paper}>
            <List>
              <ListItem>
                <h2>Order Summary</h2>
              </ListItem>
              <ListItem>
                <strong>Items: </strong> ${basket.itemsPrice}
              </ListItem>
              <ListItem>
                <strong>Shipping: </strong> ${basket.shippingPrice}
              </ListItem>
              <ListItem>
                <strong>Tax: </strong> ${basket.taxPrice}
              </ListItem>
              <ListItem>
                <strong>Sub Total: </strong> ${basket.totalPrice}
              </ListItem>
              <ListItem>
                <strong>Total: </strong> ${basket.totalPrice}
              </ListItem>
              <ListItem>
                <form className={classes.form} noValidate onSubmit={handleCodeSubmit}>
                  <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Enter Promo Code"
                    name="promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Add Promo Code
                  </Button>
                  {promoError && <Message severity='error'>{promoError}</Message>}
                </form>
                  
              </ListItem>
              {/* <ListItem> */}
                {error && <Message severity='error'>{error}</Message>}
              {/* </ListItem> */}
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
              {/* </Grid>
              </Grid> */}
            </List>
            

          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default PlaceOrderScreen