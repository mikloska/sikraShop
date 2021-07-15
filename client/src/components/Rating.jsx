import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useState, useEffect } from 'react';
// , StarHalfIcon, StarBorderIcon


const Rating = ({value,text}) =>{
  const [ratingArr, setRatingArr] = useState([])
  const tempArr = []

  useEffect(()=>{
    setRating(value);
  },[])

  const setRating=(value)=>{
    const id = 0
    value>=1 ? tempArr.push(<StarIcon style={{ fontSize: 14 }} key = {1}/>) : value >= 0.5 ? tempArr.push(<StarHalfIcon style={{ fontSize: 14 }} key = {1}/>) : tempArr.push(<StarBorderIcon style={{ fontSize: 14 }} key = {1}/>)
    value>=2 ? tempArr.push(<StarIcon style={{ fontSize: 14 }} key = {2}/>) : value >= 1.5 ? tempArr.push(<StarHalfIcon style={{ fontSize: 14 }} key = {2}/>) : tempArr.push(<StarBorderIcon style={{ fontSize: 14 }} key = {2}/>)
    value>=3 ? tempArr.push(<StarIcon style={{ fontSize: 14 }} key = {3}/>) : value >= 2.5 ? tempArr.push(<StarHalfIcon style={{ fontSize: 14 }} key = {3}/>) : tempArr.push(<StarBorderIcon style={{ fontSize: 14 }} key = {3}/>)
    value>=4 ? tempArr.push(<StarIcon style={{ fontSize: 14 }} key = {4}/>) : value >= 3.5 ? tempArr.push(<StarHalfIcon style={{ fontSize: 14 }} key = {4}/>) : tempArr.push(<StarBorderIcon style={{ fontSize: 14 }} key = {4}/>)
    value>=5 ? tempArr.push(<StarIcon style={{ fontSize: 14 }} key = {5}/>) : value >= 4.5 ? tempArr.push(<StarHalfIcon style={{ fontSize: 14 }} key = {5}/>) : tempArr.push(<StarBorderIcon style={{ fontSize: 14 }} key = {5}/>)
    setRatingArr(tempArr);
  }
  


  return(
    <div>
    <div className='rating'>
      {ratingArr}
      
        {/* <StarIcon fontSize= 'inherit'/>
        <StarIcon fontSize= 'inherit'/>
        <StarIcon fontSize= 'inherit'/>
        <StarIcon fontSize= 'inherit'/>
        <StarIcon fontSize= 'inherit'/> */}

      <span>{text}</span>

    </div>
    </div>
    
  )
}

export default Rating;