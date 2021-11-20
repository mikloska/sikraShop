import React, {useState} from 'react'
import CustomButton from '../CustomButton'
import Message from '../Message'
import{Grid, Typography, List, ListItem, FormControl, Select, MenuItem, InputLabel, TextField, Button}  from '@material-ui/core/'

const ProductReviews = ({product, userInformation, handleReviewSubmit, successProductReview, loadingProductReview, errorProductReview, formClass}) => {
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  return(
    <div>
      <Typography style={{fontSize:'25px'}}>Reviews</Typography>
      <List>
      {product.reviews.length === 0 && <Message style={{margin:20}}>No Reviews</Message>}
        {product.reviews.map((review) => (
          <List key={review._id}>
            <ListItem>
              <div style={{marginRight: 10}}><strong >{review.name}</strong></div>
              {review.createdAt.substring(0, 10)}                  
            </ListItem>
            <ListItem>
              <Rating value={review.rating} />
            </ListItem>
            <ListItem>
              <p>{review.comment}</p>
            </ListItem>
          </List>
        ))}
        {successProductReview && ( <Message severity='success'>Review submitted successfully</Message>)}
        <Typography style={{fontSize:'25px',marginTop:20}}>Write a review</Typography>
        <ListItem>
                      
          {loadingProductReview && <Loader />}
          {errorProductReview && (<Message severity='error'>{errorProductReview}</Message>)}
          {userInformation ? (
            <form onSubmit={handleReviewSubmit} className={formClass}>
              {/* <Form.Group controlId='rating'> */}
              <FormControl id='rating' value={rating} fullWidth style={{marginTop:20}}>
              <InputLabel>Rating</InputLabel>
                <Select defaultValue={''} onChange={(e) => setRating(e.target.value)}>
                  <MenuItem value='1'>1 - Poor</MenuItem>
                  <MenuItem value='2'>2 - Fair</MenuItem>
                  <MenuItem value='3'>3 - Good</MenuItem>
                  <MenuItem value='4'>4 - Very Good</MenuItem>
                  <MenuItem value='5'>5 - Excellent</MenuItem>
                </Select>
              </FormControl>
              {/* </Form.Group> */}
              <TextField id='comment' style={{marginTop:20}} fullWidth multiline aria-label="empty textarea" value={comment} 
                onChange={(e) => setComment(e.target.value)} placeholder={'Comment'} name="comment"
              />
              <CustomButton text={'Submit'} disabled={loadingProductReview} type='submit'/>
            </form>
          ) : (
            <Message>
              Please <RouterLink style={{color:'#067e78'}} to='/login'>sign in</RouterLink> to write a review{' '}
            </Message>
          )}
        </ListItem>
      </List>
    </div>
  )
}

export default ProductReviews