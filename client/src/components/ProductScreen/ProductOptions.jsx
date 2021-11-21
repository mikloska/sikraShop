import React, {useState} from 'react'
import{Grid, List, ListItem, ListItemText, MenuItem}  from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../actions/basketActions'
import NecklaceOptions from './NecklaceOptions';
import NecklaceLength from './NecklaceLength';
import BraceletOptions from './BraceletOptions';
import RingOptions from './RingOptions';
import AddToBasket from './AddToBasket';
import Pricing from './Pricing'

const useStyles = makeStyles((theme)=>({
  Label:{
    fonstSize:30
  },
  AdminButtons:{
    marginTop:10,
    color:'white',
    backgroundColor:'#067e78'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  root: {
    marginTop:50
  },
  formControl: {
    minWidth: 100
  }
}))

export const ProductOptions = ({product, match, history, chain, setChain, chainObj}) => {
  const [qty, setQty] = useState(1)
  const [ringSize, setRingSize] = useState(7)
  const [braceletSize, setBraceletSize] = useState('medium')
  const [length, setLength] = useState(15)

  const ringSizes = []
  for(let i = 5; i< 14; i++){
    ringSizes.push(
      <MenuItem key={i} value={i}>{i}</MenuItem>,
      <MenuItem key={i+'a'} value={i+.5}>{i+.5}</MenuItem>
    )
  }
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleAddToBasket = () => {
    dispatch(addToBasket(match, qty, product.category==='necklaces'?chain:null, product.category==='necklaces'?length:null, product.category==='rings'?ringSize:null,product.category==='bracelets'?braceletSize:null, product.category))
    history.push('/basket')
  }
  return(
    <Grid container justifyContent='center'>
      <Grid container justifyContent='center' style={{paddingBottom:40}} spacing={2}>
        <Grid item xs={4} md={3} align='center'>
          {product.category==='necklaces'&&
            <NecklaceOptions formClass={classes.form} chain={chain} setChain={setChain}/>
          }
          {product.category==='rings'&&
            <RingOptions ringSizes={ringSizes} setRingSize={setRingSize} formControlClass={classes.formControl}/>
          }
          {product.category==='bracelets'&&
            <BraceletOptions braceletSize={braceletSize} setBraceletSize={setBraceletSize} formControlClass={classes.formControl}/>
          }
        </Grid>
        {product.category==='necklaces'&&chain!=='none'&&(
          <Grid item xs={4} md={3} align='center'>
            <NecklaceLength formControlClass={classes.formControl} setLength={setLength}/>
          </Grid> 
        )}

      </Grid>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs={4} md={3} align='center'>
          <Pricing product={product} chain={chain} chainObj={chainObj} qty={qty}/>
        </Grid>
        <Grid item xs={4} md={3} align='center'>
          <AddToBasket product={product} formControlClass={classes.formControl} qty={qty} setQty={setQty} handleAddToBasket={handleAddToBasket} labelClass={classes.Label}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductOptions
