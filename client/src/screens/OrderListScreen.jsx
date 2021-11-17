import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

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

const OrderListScreen = ({history}) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin

  useEffect(() => {
    if (userInformation && userInformation.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInformation])

  return(
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      <Typography variant='h4'>Orders</Typography>

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
          <StyledTableCell>USER</StyledTableCell>
          <StyledTableCell>DATE</StyledTableCell>
          <StyledTableCell>TOTAL</StyledTableCell>
          <StyledTableCell>SHIPPED</StyledTableCell>
          {/* <StyledTableCell></StyledTableCell> */}

        </StyledTableRow>
      </TableHead>
      <TableBody>
      {orders.reverse().map((order) => (
        <StyledTableRow key={order._id}>
          <StyledTableCell><RouterLink style={{color:'#067e78'}} to={order.guest? `/orders/${order._id}/guest`:`/orders/${order._id}`}>{order._id}</RouterLink></StyledTableCell>
          <StyledTableCell>{order.user ? order.user.name: order.guest}</StyledTableCell>
          <StyledTableCell>{order.createdAt.substring(0, 10)}</StyledTableCell>
          <StyledTableCell>${order.totalPrice}</StyledTableCell>
          <StyledTableCell> 
            {order.isShipped ? ( order.shippedAt.substring(0, 10)) : (
              <CloseIcon/>
            )}
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

export default OrderListScreen