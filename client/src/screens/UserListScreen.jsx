import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {listUsers, deleteUser, adminUpdateUser} from '../actions/userActions'

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

const UserListScreen = ({history}) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInformation && userInformation.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInformation, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return(
    <div>
      <Typography variant='h4'>Users</Typography>

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
          <StyledTableCell>NAME</StyledTableCell>
          <StyledTableCell>EMAIL</StyledTableCell>
          <StyledTableCell>ADMIN</StyledTableCell>
          <StyledTableCell></StyledTableCell>

        </StyledTableRow>
      </TableHead>
      <TableBody>
      {users.map((user) => (
        <StyledTableRow key={user._id}>
          <StyledTableCell>{user._id}</StyledTableCell>
          <StyledTableCell>{user.name}</StyledTableCell>
          <StyledTableCell>
            <a href={`mailto:${user.email}`}  style={{color:'#067e78'}}>
              {user.email}
            </a>
          </StyledTableCell>
          <StyledTableCell>
            {user.isAdmin ? (
              <CheckIcon style={{marginLeft:13}}/>
            ):(
              <ClearIcon style={{marginLeft:13}}/>
            )}
          </StyledTableCell>
          <StyledTableCell>
            <div style={{float:'right'}}>
              <RouterLink to={`/admin/user/${user._id}/edit`}>
                <IconButton ><EditIcon/></IconButton>
              </RouterLink>
              <IconButton onClick={() => deleteHandler(user._id)}><DeleteForeverIcon/></IconButton>
            </div>
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

export default UserListScreen