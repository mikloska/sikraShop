import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Typography,Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemIcon, ListItemText, Divider, FormControl, Select, MenuItem, InputLabel, Grid, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder,} from '../actions/orderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {ORDER_PAY_RESET,  ORDER_DELIVER_RESET } from '../constants/orderConstants'

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



const OrderScreen = ({ match }) => {
  const orderId= match.params.id
  const classes = useStyles();
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)

  // if (!basket.shippingAddress.address) {
  //   history.push('/shipping')
  // } else if (!basket.paymentMethod) {
  //   history.push('/payment')
  // }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  if(!loading){
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {

    if (!userInformation) {
      history.push('/login')
    }


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
    //Check for order and if the order id doesn't match id in url, get most recent
    if (!order || successPay || order._id !== orderId) {
      //Prevent useEffect loop
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message severity='error'>{error}</Message>
  ) : (
    <div>
      <Grid container justifyContent="center" alignItems="center" spacing={6}>
        <Grid item md={6} sm={10} xs={12}>
        <Paper elevation={7} className={classes.paper}>
          <List  >
          <ListItem>
          <Grid container justifyContent="center" >
            <Grid item><h2>Order Details</h2>
            </Grid>
              </Grid>
            </ListItem>
           <ListItem>
            <ListItemText>
              <Grid container justifyContent="center" >
               <Grid item><strong> Order:  </strong>
                 {order._id}
                </Grid>
                </Grid>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Name: </strong>
                  {' '}{order.user.name}
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Email: </strong>
                  {' '}<a href={`mailto:${order.user.email}`} style={{color:'#067e78'}}>{order.user.email}</a>
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>
            
            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Shipping Address: </strong>
                  {' '}{order.shippingAddress.address} {order.shippingAddress.city}{' '}
                  {order.shippingAddress.zip},{' '}
                  {order.shippingAddress.country}
                  </Grid>
                </Grid>

              </ListItemText>
            </ListItem>
            <ListItem>
            {order.isDelivered ? (
                <Message severity='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message severity='warning'>Not Delivered</Message>
              )}
            </ListItem>

            <ListItem>
              <ListItemText>
                <Grid container justifyContent="center" >
                  <Grid item><strong>Payment Method: </strong>
                {' '}{order.paymentMethod}
                </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            <ListItem>
            {order.isPaid ? (
                <Message severity='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message severity='warning'>Not Paid</Message>
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
                  <StyledTableCell>TOTAL</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {order.orderItems.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
                    <Box className={classes.Box}><img src={item.image} alt={item.name} className={classes.Media}/></Box>
                      {item.name}
                    </RouterLink>
                  </StyledTableCell>
                  <StyledTableCell>{item.qty}</StyledTableCell>
                  <StyledTableCell>${item.price}</StyledTableCell>
                  <StyledTableCell>${item.qty * item.price}</StyledTableCell>
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
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListItem>
              )}


            </List>

          </Paper>
        </Grid>
      </Grid>






    </div>
   
    
  )
}






export default OrderScreen