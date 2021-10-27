import React, {useState, useEffect} from 'react'
import {Avatar, Button, Card, TextField, IconButton, List, ListItem, ListItemText, Grid, 
Box, Paper, Typography, Divider, Container,Checkbox,FormGroup, FormControlLabel} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import axios from 'axios'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft:20,
    paddingRight:20
    // padding: theme.spacing(5),
    // height="100%"
  },
  paper: {
    // marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // backgroundColor:'#067e78'
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: 40,
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  Additional: {
    marginTop:15
  }

}));



const PromoCodeScreen = () =>{
  const [promoCodes, setPromoCodes]=useState([])
  const [promoCode, setPromoCode]=useState('')
  const [percentage, setPercentage]=useState(0)
  const [message, setMessage]=useState(null)
  const classes = useStyles();
  const getCodes= async ()=>{
    const promos=await axios.get('/api/promocode')
    setPromoCodes(promos.data.promos)
  }
  //Get codes on first render
  useEffect( ()=>{
    getCodes()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(promoCode===''||percentage===0){
      setMessage('Please fill out all fields!')
    }
    else{
      await axios.post('/api/promocode', {promoCode:promoCode, percentage:percentage})
      getCodes()
      setPromoCode('')
      setPercentage(0)
    }
  }
  const deleteCode= async (codeId)=>{
    // console.log(codeId)
    await axios.delete(`/api/promocode/${codeId}`, )
    getCodes()
  }

  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      <Grid container justifyContent="center">
      <Grid item lg={6} md={6} sm={12} xs={12}>
          <Container component="main" maxWidth="xs">
            <Paper>
              <Card>
                <Box p={6} >
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                      Current Promo Codes
                    </Typography>
                    <List> 
                      {promoCodes.map(element=>(
                        <ListItem key={element._id}>
                          <ListItemText>{`${element.promoCode} ${element.percentage}% off`}</ListItemText>
                          <IconButton onClick={() => deleteCode(element._id)} > 
                            <DeleteForeverIcon style={{color:"#d11919"}}/>
                          </IconButton>
                        </ListItem>
                      ))
                      }
                    </List>
                    </div>
                  </Box>
              </Card>
            </Paper>
          </Container>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Container component="main" maxWidth="xs">
            <Paper>
              <Card>
                <Box p={6} >
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar} >
                      <LoyaltyIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Promo Code
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit} >
                      <TextField variant="outlined" margin="normal" required fullWidth id="promo" label="Promo Code"
                        name="promo"  value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                        }}
                      />
                      <TextField variant="outlined" margin="normal" required fullWidth id="percentage" label="Percentage"
                        name="percentage"  value={percentage===0?'':percentage}
                        onChange={(e) => {
                          setPercentage(e.target.value);
                        }}
                      />
                      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{marginTop: 40}}>
                        Submit
                      </Button>
                    </form>
                    {message && <Message style={{width:'100%',marginTop:8}} severity='error' >{message}</Message>}
                    </div>
                  </Box>
              </Card>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default PromoCodeScreen