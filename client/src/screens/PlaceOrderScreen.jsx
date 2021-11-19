import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, TextField, Table, TableBody, TableCell, TableHead, TableRow, ListItemText, Grid, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import CustomButton from '../components/CustomButton'
import { payOrder, payGuestOrder, createOrder, createGuestOrder } from '../actions/orderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

const useStyles = makeStyles(() => ({
  submit: {
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
  },
  Box: {
    width:50
  },
  Media: {
    height: 'auto',
    maxWidth:'100%'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '200px',
  },
  
}))

const PlaceOrderScreen = ({ history }) => {
  const guest=useSelector(state=>state.guest.guestCheckout)
  const classes = useStyles();
  const dispatch = useDispatch()
  const states=useSelector(state=>state.states)
  const basket = useSelector((state) => state.basket)
  const [sdkReady, setSdkReady] = useState(false)
  const [promoCode, setPromoCode]=useState('')
  const [displayPromoCode, setDisplayPromoCode]=useState('')
  const [promoPercentage, setPromoPercentage]=useState(0)
  const [promoError, setPromoError]=useState(null)

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
    basket.shippingAddress.city.toUpperCase().includes('NEW YORK')&&basket.shippingAddress.state.toUpperCase().includes('NEW YORK')?.08875
    :basket.shippingAddress.city.toUpperCase().includes('LOS ANGELES')?.095
    :basket.shippingAddress.city.toUpperCase().includes('SAN FRANCISCO')?.08625
    :(basket.shippingAddress.state!==''&&!basket.shippingAddress.city.toUpperCase().includes('NEW YORK')&&!basket.shippingAddress.city.toUpperCase().includes('LOS ANGELES')&&!basket.shippingAddress.city.toUpperCase().includes('SAN FRANCISCO'))?states[basket.shippingAddress.state]
    :basket.shippingAddress.country==='Canada'&&basket.shippingAddress.province!=='Ontario'?.015
    :basket.shippingAddress.province==='Ontario'?.013
    :0)
  basket.shippingPrice = (basket.shippingAddress)&&(basket.shippingAddress.country==='United States'?0:basket.shippingAddress.country==='Canada'?addDecimals(13):basket.shippingAddress.country==='United Kingdom'?addDecimals(16):addDecimals(18))
  basket.taxPrice = addDecimals(Number((taxRate * basket.itemsPrice-((taxRate * basket.itemsPrice)*promoPercentage/100)).toFixed(2))) 
  basket.totalPrice = (
    Number(basket.itemsPrice) +
    Number(basket.shippingPrice) +
    Number(basket.taxPrice)
  ).toFixed(2)
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
      setPromoPercentage(discountPercentage.data.percentage) 
      setDisplayPromoCode(discountPercentage.data.promoCode)
    }
    setPromoCode('')
  }

  useEffect(() => {
    if ((!userInformation && !basket.guestInfo)||!basket.shippingAddress) history.push('/shipping')
    
    if (success) {
      if(!guest){
        axios.post('/api/email/order', {usersName:userInformation.name,userEmail:userInformation.email,price:basket.totalPrice, orderId:order._id, guest:guest})
        history.push(`/orders/${order._id}`)
      } 
      if(guest){
        axios.post('/api/email/order', {usersName:basket.guestInfo.name,userEmail:basket.guestInfo.email,price:basket.totalPrice, orderId:order._id, guest:guest})
        history.push(`/orders/${order._id}/guest`)
      } 
      axios.post('/api/email/ordernotification', {orderId:order._id})
    }
    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [history, success])
  const successPaymentHandler = (paymentResult) => {
    if(guest){
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
          totalPrice: addDecimals(Number(basket.totalPrice-(basket.itemsPrice*promoPercentage/100).toFixed(2))),
          paymentResult: paymentResult,
          promoUsed: `${promoCode} ${promoPercentage}% off`,
        })
    )}
    if(guest) dispatch(payGuestOrder(order._id, paymentResult))
    
    if(!guest){
      dispatch(
        createOrder({
          orderItems: basket.basketItems,
          shippingAddress: basket.shippingAddress,
          paymentMethod: basket.paymentMethod,
          itemsPrice: basket.itemsPrice,
          shippingPrice: basket.shippingPrice,
          taxPrice: basket.taxPrice,
          totalPrice: addDecimals(Number(basket.totalPrice-(basket.itemsPrice*promoPercentage/100).toFixed(2))),
          paymentResult: paymentResult,
          promoUsed: `${promoCode} ${promoPercentage}% off`,
        })
    )}
    if(!guest) dispatch(payOrder(order._id, paymentResult))
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
                    {guest&&basket.guestInfo.name} {userInformation&&userInformation.name}
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
                    {item.category==='necklaces'&&item.chain==='silver'&&` -${item.length}" silver chain`}
                    {item.category==='necklaces'&&item.chain==='cord'&&` -${item.length}" cord`}
                    {item.category==='rings'&&` -size ${item.size}`}
                    {item.category==='bracelets'&&` -size ${item.braceletSize}`}
                  </StyledTableCell>
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
          <Paper elevation={7} className={classes.paper} style={{width:'100%'}}>
            <List>
              <ListItem>
                <h2>Order Summary</h2>
              </ListItem>
              <ListItem>
                <strong>Items: </strong> ${basket.itemsPrice}
              </ListItem>
              <ListItem>
                <strong>Tax: </strong> ${basket.taxPrice}
              </ListItem>
              <ListItem>
                <strong>Sub Total: </strong> ${Number(basket.totalPrice-basket.shippingPrice).toFixed(2)}  
              </ListItem>
              {displayPromoCode!==''&&(
                <>
                  <ListItem>
                    <strong>Discount: </strong> -${`${addDecimals(Number((basket.itemsPrice*(promoPercentage/100)).toFixed(2)))} (${promoPercentage}% off)`}
                  </ListItem>
                  <ListItem>
                    <strong>Promo Code: </strong>{displayPromoCode}  
                  </ListItem>
                </>
              )}
              <ListItem>
                <strong>Shipping: </strong> ${basket.shippingPrice}
              </ListItem>
              <ListItem>
                <strong>Total: </strong> ${addDecimals(Number(basket.totalPrice-(basket.itemsPrice*promoPercentage/100).toFixed(2)))}
              </ListItem>
              <ListItem>
                <form className={classes.form} noValidate onSubmit={handleCodeSubmit}>
                  <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Enter Promo Code"
                    name="promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <CustomButton text={'Add Promo Code'} />
                  {promoError && <Message severity='error'>{promoError}</Message>}
                </form>  
              </ListItem>
                {error && <Message  severity='error'>{error}</Message>}
              <ListItem>
              {!sdkReady && (
                    <Loader />
                  )} 
              {( basket.paymentMethod==='PayPal' &&
                    <PayPalButton
                      shippingPreference="NO_SHIPPING"
                      amount={addDecimals(Number(basket.totalPrice-(basket.itemsPrice*promoPercentage/100).toFixed(2)))}
                      onSuccess={successPaymentHandler}
                    />
                  )}
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default PlaceOrderScreen