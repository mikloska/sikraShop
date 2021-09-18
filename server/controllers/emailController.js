import nodemailer from 'nodemailer'
export {signUpEmail, orderEmail}

const signUpEmail = (req,res,next)=>{
  try{
    const {usersName, userEmail} = req.body
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: 'info@sikrajewelry.com',
          pass: process.env.PW
      }
    });
    let mailOptions = {
      from: '"Sara " info@sikrajewelry.com', // sender address (who sends)
      to: 'mikloska973@gmail.com', // list of receivers (who receives)
      subject: '', // Subject line
      text: 'Welcome to Sikra Jewelry', // plaintext body
      html: `<b>Hello ${usersName} </b><br> Thanks for signing up at Sikra Jewelry ${userEmail}` // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
  
      console.log('Message sent: ' + info.response);
    })
    res.send('sent')

  }
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error adding order items: ${error.message}`)
  }
}


const orderEmail = (req,res,next)=>{
  try{
    const {usersName, userEmail, price } = req.body
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: 'info@sikrajewelry.com',
          pass: process.env.PW
      }
    });
    let mailOptions = {
      from: '"Yo dude " info@sikrajewelry.com', // sender address (who sends)
      to: 'mikloslkertesz@gmail.com', // list of receivers (who receives)
      subject: '', // Subject line
      text: `Hello ${usersName}, thanks for purchasing from Sikra Jewelry`, // plaintext body
      html: `<b>Thanks for your purchase! </b><br> We bled you for $${price}` // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
  
      console.log('Message sent: ' + info.response);
    })
    res.send('sent')

  }
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error adding order items: ${error.message}`)
  }
}