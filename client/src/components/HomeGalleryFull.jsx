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
          // strength={830}
          // renderLayer={percentage => (
          //   <div style={{left: '50%', top: '50%', height: percentage * 830}} />
          // )}
          >
        </Parallax>
  
        <Parallax
          blur={{ min: 10, max: -10 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/owl-group.jpg'}
          bgImageAlt="owls" 
          // strength={830}
          // renderLayer={percentage => (
          //   <div style={{left: '50%', top: '50%', height: percentage * 830}} />
          // )}
        >
        </Parallax>
        <Parallax
          blur={{ min: 15, max: -15 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/silver-bobcat-pendant-outdoor.jpg'}
          bgImageAlt="bobcat" 
          // strength={830}
          // renderLayer={percentage => (
          //   <div style={{left: '50%', top: '50%', height: percentage * 830}} />
          // )}
        >
        </Parallax> 
        <Parallax
          blur={{ min: 15, max: -15 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Dragon-ring-moss.jpg'}
          bgImageAlt="dragon" 
          // strength={830}
          // renderLayer={percentage => (
          //   <div style={{left: '50%', top: '50%', height: percentage * 830}} />
          // )}
        >
        </Parallax>
        <Parallax
          blur={{ min: 10, max: -15 }}
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Fossil-Ring-Gold-Amber-Enamel-Outside-Side.jpg'}
          bgImageAlt="fossil ring"
          // strength={830}
          // renderLayer={percentage => (
          //   <div style={{left: '50%', top: '50%', height: percentage * 830}} />
          // )}
        >
        </Parallax>
      </div>
    );
    
}

export default HomeGalleryFull