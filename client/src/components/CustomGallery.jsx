import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  Images:{
    width:'70vw'
  }
}));

const CustomGallery =()=> {
  const classes = useStyles();
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    return (
      <Slider {...settings} autoplay={true} autoplaySpeed={2000} pauseOnHover={false}>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom1.jpg" />
        </div>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom2.jpg" />
        </div>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom3.jpg" />
        </div>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom4.jpg" />
        </div>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom7.jpg" />
        </div>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom8.jpg" />
        </div>
        <div>
          <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom9.jpg" />
        </div>
      </Slider>
    );
    
}

export default CustomGallery