import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Parallax, Background } from 'react-parallax';

const useStyles = makeStyles((theme) => ({
  Images:{
    width:'100vw'
  }
}));

const HomeGallery =({w, h})=> {


    return (
      <div>
        <Parallax
          blur={{ min: 15, max: -15 }}
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/ammonite.jpg'}
          bgImageAlt="ammonite" 
          strength={-200}
          >
          <div style={{width:'370px', height: '400px'}} />
        </Parallax>
  
        <Parallax
          blur={{ min: 15, max: -15 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/owl-group.jpg'}
          bgImageAlt="owls" 
          strength={-200}
        >
          <div style={{width:'370px', height: '400px'}} />
        </Parallax>
        <Parallax
          blur={{ min: 15, max: -15 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Dragon face moss.jpg'}
          bgImageAlt="dragon" 
          strength={-200}
        >
          <div style={{width:'370px', height: '400px'}} />
        </Parallax>
        <Parallax
          blur={{ min: 15, max: -15 }}
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/rings/Fossil-Ring-Gold-Amber-Enamel-Outside-Side-cropped.jpg'}
          bgImageAlt="fossil ring"
          strength={-200}
        >
          <div style={{width:'370px', height: '400px'}} />
        </Parallax>
        <Parallax
          blur={{ min: -10, max: 10 }} 
          bgImage={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/sleeping-dragon-pendant-slate-2.jpg'}
          bgImageAlt="bobcat" 
          strength={-200}
        >
          <div style={{width:'370px', height: '400px'}} />
        </Parallax> 
      </div>
    );
    
}

export default HomeGallery