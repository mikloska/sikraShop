{order.orderItems.length === 0 ? (
  <Message>Order not found</Message>
) : (
<Table>
  <TableHead>
    <TableRow>
      <TableCell>ITEM</TableCell>
      <TableCell>QUANTITY</TableCell>
      <TableCell>UNIT PRICE</TableCell>
      <TableCell>TOTAL</TableCell>
      <TableCell></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {order.orderItems.map((item, index) => (
    <TableRow key={index}>
      <TableCell>
        <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
          {item.name}
        </RouterLink>
      </TableCell>
      <TableCell>{item.qty}</TableCell>
      <TableCell>${item.price}</TableCell>
      <TableCell>${item.qty * item.price}</TableCell>
    </TableRow>
  ))}
  </TableBody>



</Table>
)}














<ListItem>
<ListItemText>
  {/* <strong>Items:</strong> */}
    {basket.basketItems.length === 0 ? (
  <Message>Your basket is empty</Message>
) : (
  <Grid container justifyContent="center" >
  <Grid item>
  {/* <List  > */}
    {basket.basketItems.map((item, index) => (
      <ListItemText style={{padding:10}} key={index}>
        {/* <Grid container> */}
          {/* <Grid item sm={2} md={1}>
            <img src={item.image} alt={item.name} className={classes.Media}/>
          </Grid> */}
          {/* <Grid item> */}
            <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
              {item.name}
            </RouterLink>
          {/* </Grid>
          <Grid item md={4}> */}
            :{'  '}{item.qty} x ${item.price} = ${item.qty * item.price}
          {/* </Grid>
        </Grid> */}
      </ListItemText>
    ))}
  {/* </List> */}
  </Grid>

  </Grid>
)}

</ListItemText>
</ListItem>





{order.orderItems.length === 0 ? (
  <Message>Order not found</Message>
) : (
<Table>
  <TableHead>
    <TableRow>
      {/* <TableCell>IMG</TableCell> */}
      <TableCell>ITEM</TableCell>
      <TableCell>QUANTITY</TableCell>
      <TableCell>UNIT PRICE</TableCell>
      <TableCell>TOTAL</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {order.orderItems.map((item, index) => (
    <TableRow key={index}>
      <TableCell>
        <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
        <Box className={classes.Box}><img src={item.image} alt={item.name} className={classes.Media}/></Box>
        {item.name}
        </RouterLink>
      </TableCell>
      {/* <TableCell><Box className={classes.Box}><img src={item.image} alt={item.name} className={classes.Media}/></Box></TableCell> */}
      <TableCell>{item.qty}</TableCell>
      <TableCell>${item.price}</TableCell>
      <TableCell>${item.qty * item.price}</TableCell>
    </TableRow>
  ))}
  </TableBody>



</Table>






<ListItem>
<ListItemText>
  {/* <strong>Items:</strong> */}
    {order.orderItems.length === 0 ? (
  <Message>Order not found</Message>
) : (
  <Grid container justifyContent="center" >
  <Grid item>
  {/* <List  > */}
    {order.orderItems.map((item, index) => (
      
      <ListItemText style={{padding:10}} key={index}>
        {/* <Grid container> */}
          {/* <Grid item sm={2} md={1}> */}
            
          {/* </Grid> */}
          {/* <Grid item> */}
            <RouterLink style={{color:'#067e78'}} to={`/product/${item.product}`}>
            {/* <Box className={classes.Box}><img src={item.image} alt={item.name} className={classes.Media}/></Box> */}
              {item.name}
              
            </RouterLink>
          {/* </Grid>
          <Grid item md={4}> */}
            :{'  '}{item.qty} x ${item.price} = ${item.qty * item.price}
          {/* </Grid>
        </Grid> */}
      </ListItemText>
    ))}
  {/* </List> */}
  </Grid>

  </Grid>
)}

</ListItemText>
</ListItem>