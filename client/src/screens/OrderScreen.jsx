import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Typography,Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, List, ListItem, ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, Grid, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, getAdminOrderDetails, getGuestOrderDetails,payOrder, shipOrder,} from '../actions/orderActions'
import axios from 'axios'
// import { PayPalButton } from 'react-paypal-button-v2'
import {ORDER_PAY_RESET,  ORDER_SHIP_RESET } from '../constants/orderConstants'
import { listMyOrders } from '../actions/orderActions'
import { is } from 'core-js/library/es7/object';

const useStyles = makeStyles((theme) => ({
  submit: {
    color:'white',
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



const OrderScreen = ({ match, location, history}) => {
  const orderId= match.params.id
  const classes = useStyles();
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingLink, setTrackingLink] = useState('')

  // if (!basket.shippingAddress.address) {
  //   history.push('/shipping')
  // } else if (!basket.paymentMethod) {
  //   history.push('/payment')
  // }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderList = useSelector((state) => state.orderList)
  const { orders, loadingOrders, orderListError } = orderDetails

  const [isAdmin, setIsAdmin] = useState(false)
  

  const shipHandler = () => {
    dispatch(shipOrder(order, trackingNumber,trackingLink))
    axios.post('/api/email/shippingnotification', 
      {
        usersName: location.pathname.includes('guest') ? order.guest : order.user.name,
        userEmail: location.pathname.includes('guest') ? order.email : order.user.email,
        orderId:order._id,
        guest: location.pathname.includes('guest') ? true : false
      }
    )
  }


  if(!loading&&!error && (order && order.orderItems)){
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    if(order.orderItems.length > 0){
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    }
  }

  // useEffect(() => {
  //   dispatch({ type: ORDER_PAY_RESET })
  //   dispatch({ type: ORDER_SHIP_RESET })
  //   if(location.pathname.includes('guest')){
  //     dispatch(getGuestOrderDetails(orderId))
  //   } else {
  //     dispatch(getOrderDetails(orderId))
  //   }
    
  //   // if(order && !location.pathname.includes('guest') || (order._id !== orderId)) dispatch(getOrderDetails(orderId))
  //   // if((order && order.guest) && !location.pathname.includes('guest')) dispatch(getOrderDetails(orderId))
  //   // console.log('location: ' , location.pathname.includes('guest'))
  //   // dispatch(payOrder(orderId, paymentResult))
  //   //Commented out below so guests can view order. May need to figure out alternate way to protect users
  //   if (!userInformation&&!location.pathname.includes('guest')) {
  //     history.push('/login')
  //   }

  // }, [])
  

  useEffect(() => {
    //Commented out below so guests can view order. May need to figure out alternate way to protect users
    if (!userInformation && !location.pathname.includes('guest')) {
      history.push('/login')
    }
    //Check for order and if the order id doesn't match id in url, get most recent
    if (!order || successPay || (order && order._id !== orderId) || successDeliver ) {
      if(userInformation && userInformation.isAdmin){
        dispatch(getAdminOrderDetails(orderId))
      }
      if(userInformation && userInformation.isAdmin && (order && !order.user)){
        dispatch(getAdminOrderDetails(orderId))
      }
      //Prevent useEffect loop
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_SHIP_RESET })
      if(location.pathname.includes('guest')){
        dispatch(getGuestOrderDetails(orderId))
      } 
      if(userInformation && userInformation.isAdmin && !location.pathname.includes('guest')){
        dispatch(getAdminOrderDetails(orderId))
      }
      if(userInformation && !userInformation.isAdmin && !location.pathname.includes('guest')){
        dispatch(getOrderDetails(orderId, true))
      }

    } 
  }, [dispatch, orderId, successPay, order, successDeliver])


  return loading ? (
    <Loader />
  ) : error ? (
    <Message severity='error'>{error}</Message>
  ) : (
    
    <div  style={{marginTop:35, marginBottom: 45, padding:20}}>
      {(order && order.shippingAddress && order.shippingAddress.address && (location.pathname.includes('guest') || (order && order.user && order.user.name))) &&
      <Grid container justifyContent="center" spacing={6}>
        <Grid item md={6} sm={2} xs={12}>
        <Paper elevation={7} className={classes.paper}>
          <List  >
          <ListItem>
          <Grid container justifyContent="flex-start" >
            <Grid item><h2>Order Details</h2>
            </Grid>
              </Grid>
            </ListItem>
           <ListItem>
            <ListItemText>
              <Grid container justifyContent="flex-start" >
               <Grid item><strong> Order:  </strong>
                 {order._id}
                </Grid>
                </Grid>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Grid container justifyContent="flex-start" >
                  <Grid item><strong>Name: </strong>
                  {' '}{location.pathname.includes('guest') ? order.guest: order.user.name}
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Grid container justifyContent="flex-start" >
                  <Grid item><strong>Email: </strong>
                  {' '}<a href={`mailto:${location.pathname.includes('guest')?order.email:order.user.email}`} style={{color:'#067e78'}}>{location.pathname.includes('guest')?order.email:order.user.email}</a>
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>
            
            <ListItem>
              <ListItemText>
                <Grid container justifyContent="flex-start" >
                  <Grid item><strong>Shipping Address: </strong>
                  {' '}{order.shippingAddress.address} {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state!==''&& order.shippingAddress.state}{order.shippingAddress.province!==''&& order.shippingAddress.province}{' '}
                  {order.shippingAddress.zip}{' '}{order.shippingAddress.country}
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>
            {loadingDeliver && <Loader />}
            {userInformation &&
                userInformation.isAdmin &&
                order.isPaid &&
                !order.isShipped && (
                  <ListItem>
                    <Button className={classes.submit}
                      onClick={shipHandler}
                    >
                      Mark As Shipped
                    </Button>
                    <TextField style={{marginLeft:20}} id="outlined-basic" label="Enter Tracking #" variant="outlined" 
                    value={trackingNumber} onChange={(e) => {setTrackingNumber(e.target.value);}}/>
                    <TextField style={{marginLeft:20}} id="outlined-basic" label="Enter Tracking link" variant="outlined" 
                    value={trackingLink} onChange={(e) => {setTrackingLink(e.target.value);}}/>
                  </ListItem>
                )}
            {/* <ListItem>
              <ListItemText>
                <Grid container justifyContent="flex-start" >
                  <Grid item><strong>Payment Method: </strong>
                {' '}{order.paymentMethod}
                </Grid>
                </Grid>
              </ListItemText>
            </ListItem> */}
            <ListItem>
            {order.isPaid ? (
                <Message severity='success'>Paid on {order.paidAt.split('T')[0]}</Message>
              ) : (
                <Message severity='warning'>Not Paid</Message>
              )}
            </ListItem>
            <ListItem>
            {order.isShipped ? (
                <Message severity='success'>Shipped on {order.shippedAt.split('T')[0]}<br></br><b>Click to view tracking information:</b> <a href={order.trackingLink} target="_blank" style={{color:'#067e78'}}>{order.trackingNumber}</a></Message>
                
              ) : (
                <Message severity='warning'>Preparing for shipment</Message>
              )}
            </ListItem>

            {order.orderItems.length === 0 ? (
              <Message>Order not found</Message>
            ) : (
            <Table className={classes.table} style={{marginTop:20}}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>ITEM</StyledTableCell>
                  <StyledTableCell>QTY</StyledTableCell>
                  <StyledTableCell>PRICE</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {order.orderItems.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
                    {item.image?<Box className={classes.Box}><img src={item.image[0]} alt={item.name} className={classes.Media}/></Box>:<Loader/>}
                      {item.name}
                    </RouterLink>
                    {item.category==='necklaces'&&item.chain==='silver'&&` -${item.length}" silver chain`}
                    {item.category==='necklaces'&&item.chain==='cord'&&` -${item.length}" cord`}
                    {item.category==='rings'&&item.size>0&&` -size ${item.size}`}
                    {item.category==='bracelets'&&` -size ${item.braceletSize}`}
                  </StyledTableCell>
                  <StyledTableCell>{item.qty}</StyledTableCell>
                  <StyledTableCell>${item.price}</StyledTableCell>
                  <StyledTableCell>${item.qty * item.price}</StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>



            </Table>
            )}
            {/* <Table className={classes.table} style={{marginTop:20}}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>SUBTOTAL</StyledTableCell>
                  <StyledTableCell>SHIPPING</StyledTableCell>
                  <StyledTableCell>TAX</StyledTableCell>
                  <StyledTableCell>T</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
               <StyledTableRow>
                <StyledTableCell>${order.itemsPrice}</StyledTableCell>
                <StyledTableCell>${order.shippingPrice}</StyledTableCell>
                <StyledTableCell>${order.taxPrice}</StyledTableCell>
                <StyledTableCell>${order.totalPrice}</StyledTableCell>
              </StyledTableRow>
            
              </TableBody>



            </Table> */}
            <ListItem>
                <Grid container justifyContent="flex-end" style={{marginTop:20}}>
                  <Grid item><strong>Subtotal: </strong> ${order.itemsPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="flex-end" >
                  <Grid item><strong>Shipping: </strong> ${order.shippingPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="flex-end" >
                  <Grid item><strong>Tax: </strong> ${order.taxPrice}</Grid>
                </Grid>
              </ListItem>
              {order.promoUsed!==' 0% off'&&
                <ListItem>
                <Grid container justifyContent="flex-end" >
                    <Grid item><strong>Promo Used: </strong> {order.promoUsed}</Grid>
                  </Grid>
                </ListItem>
              }
              <ListItem>
                <Grid container justifyContent="flex-end"  style={{marginBottom:20}}>
                  <Grid item><strong>Total: </strong> ${order.totalPrice}</Grid>
                </Grid>
              </ListItem>

              {!order.isPaid && (
                <ListItem>
                  {loadingPay && <Loader />}
                  {/* {!sdkReady && (
                    <Loader />
                  )}   */}
                  {/* {( order.paymentMethod==='PayPal' &&
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )} */}
                </ListItem>
              )}

          </List>
          </Paper>
        </Grid>



        {/* <Grid item md={5} sm={10} xs={12}>
          <Paper elevation={7} className={classes.paper}>
            <List  >
              <ListItem>
                <h2>Order Summary</h2>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Items: </strong> ${order.itemsPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Shipping: </strong> ${order.shippingPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Tax: </strong> ${order.taxPrice}</Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Total: </strong> ${order.totalPrice}</Grid>
                </Grid>
              </ListItem>

              {!order.isPaid && (
                <ListItem>
                  {loadingPay && <Loader />}
                  {/* {!sdkReady && (
                    <Loader />
                  )}   */}
                  {/* {( order.paymentMethod==='PayPal' &&
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )} */}
                {/* </ListItem>
              )} */}


            {/* </List>

          </Paper>
        </Grid> */}
      </Grid>
      }
    </div>
   
    
  )
}






export default OrderScreen