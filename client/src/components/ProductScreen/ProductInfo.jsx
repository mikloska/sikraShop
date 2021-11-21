import React from 'react'
import{Typography, List, ListItem, ListItemText, Divider, Button, Grid}  from '@material-ui/core/'

const ProductInfo = ({product, userInformation, chain, chainObj, setRearrange, AdminButtonsClass, Rating, history}) => {
  return(
    <List>
      <ListItem>
        <Typography style={{fontSize:'30px'}}>{product.name}</Typography>
        {userInformation&&userInformation.isAdmin&&
          <Grid container spacing={3}>
            <Grid item>
              <Button className={AdminButtonsClass} onClick={()=>history.push(`/admin/product/${product._id}/edit`)} >Edit Product</Button>
            </Grid>
            <Grid item>
              <Button className={AdminButtonsClass} onClick={()=>setRearrange(true)}>Rearrange Images</Button>
            </Grid>
          </Grid>
        }
      </ListItem>
      <Divider light />
      {product.reviews.length > 1 &&
      <ListItem>
        <Rating value={product.rating}/>
        <ListItemText style={{marginLeft:10}} >{`${product.numReviews} reviews`}</ListItemText>
      </ListItem>}
      {product.reviews.length === 1 &&
      <ListItem>
        <Rating value={product.rating}/>
        <ListItemText style={{marginLeft:10}} >{`${product.numReviews} review`}</ListItemText>
      </ListItem>}
      {product.reviews.length > 0 &&<Divider light />}
      <ListItem>
        <ListItemText>
          Price: ${product.category==='necklaces'? (product.price+chainObj[chain]).toFixed(2) : product.price}
          </ListItemText>
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText>
          Category: {product.category==='necklaces'?'Necklaces & Pendants':product.category==='earrings'?'Earrings':product.category==='rings'?'Rings':product.category==='bracelets'?'Bracelets':''}
          </ListItemText>
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText>{product.description}</ListItemText>
    </ListItem>
  </List>
  )

}

export default ProductInfo