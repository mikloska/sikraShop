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
  AdminButtons:{
   marginLeft:30, 
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
    <Grid container spacing={1} alignItems='center' justifyContent='center'>
      <Grid item md={7}>
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
      <Grid item xs={6} md={4}>

      <List>

      {product.category==='necklaces'&&chain!=='none'&&(
        <NecklaceLength formControlClass={classes.formControl} setLength={setLength}/>
      )}
    </List>
    </Grid>
    <Grid item md={5}>
      <Pricing product={product} chain={chain} chainObj={chainObj} qty={qty}/>

    </Grid>

  <Grid item xs={6} md={4}>
    <AddToBasket product={product} formControlClass={classes.formControl} qty={qty} setQty={setQty} handleAddToBasket={handleAddToBasket}/>
  </Grid>
  </Grid>
  )
}

export default ProductOptions
