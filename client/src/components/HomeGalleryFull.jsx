import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Parallax, Background } from 'react-parallax';

const useStyles = makeStyles((theme) => ({
  Images:{
    width:'100vw'
  }
}));

const HomeGalleryFull =()=> {


    return (
      <div>
        <Parallax
          blur={{ min: 10, max: -15 }}
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/ammonite.jpg'}
          bgImageAlt="ammonite" 
          strength={-200}
          >
          <div style={{width:'1920px', height: '750px'}} />
        </Parallax>
  
        <Parallax
          blur={{ min: 10, max: -10 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/owl-group.jpg'}
          bgImageAlt="owls" 
          strength={-200}
        >
          <div style={{width:'1920px', height: '750px'}} />
        </Parallax>
        <Parallax
          blur={{ min: 15, max: -15 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/silver-bobcat-pendant-outdoor.jpg'}
          bgImageAlt="bobcat" 
          strength={-200}
        >
          <div style={{width:'1920px', height: '750px'}} />
        </Parallax> 
        <Parallax
          blur={{ min: 15, max: -15 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Dragon-ring-moss.jpg'}
          bgImageAlt="dragon" 
          strength={-200}
        >
          <div style={{width:'1920px', height: '750px'}} />
        </Parallax>
        <Parallax
          blur={{ min: 10, max: -15 }}
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Fossil-Ring-Gold-Amber-Enamel-Outside-Side.jpg'}
          bgImageAlt="fossil ring"
          strength={-200}
        >
          <div style={{width:'1920px', height: '750px'}} />
        </Parallax>
      </div>
    );
    
}

export default HomeGalleryFull