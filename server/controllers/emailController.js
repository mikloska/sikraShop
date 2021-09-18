import nodemailer from 'nodemailer'
export {signUpEmail, orderEmail, orderNotificationEmail, shippingNotificationEmail}

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
      from: '"Sikra Jewelry " info@sikrajewelry.com', // sender address (who sends)
      to: 'mikloskertesz@hotmail.com', // list of receivers (who receives)
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
    const {usersName, userEmail, price, orderId } = req.body
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
      from: '"Sikra Jewelry " info@sikrajewelry.com', // sender address (who sends)
      to: 'mikloskertesz@hotmail.com', // list of receivers (who receives)
      subject: '', // Subject line
      text: `Hello ${usersName}, thanks for purchasing from Sikra Jewelry`, // plaintext body
      html: `<b>Hello ${usersName},</b><br>Thanks for supporting a small business by purchasing from Sikra Jewelry. Look at the order here: <a href = 'http://www.sikrajewelry.com/orders/${orderId}'>${orderId}<a/>` // html body
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

const orderNotificationEmail = (req,res,next)=>{
  try{
    const {orderId} = req.body
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
      from: '"Us " info@sikrajewelry.com', // sender address (who sends)
      to: 'info@sikrajewelry.com', // list of receivers (who receives)
      subject: '', // Subject line
      text: `Hello Miklos & Sara, You have a new order!`, // plaintext body
      html: `<b>Hello Miklos & Sara, You have a new order!</b><br>Look at the order here: <a href = 'http://www.sikrajewelry.com/orders/${orderId}'>${orderId}<a/>` // html body
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

const shippingNotificationEmail = (req,res,next)=>{
  try{
    const {usersName, userEmail, orderId} = req.body
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
      from: '"Sikra Jewelry " info@sikrajewelry.com', // sender address (who sends)
      to: 'mikloskertesz@hotmail.com', // list of receivers (who receives)
      subject: '', // Subject line
      text: `Hello ${usersName}, Your order has shipped!`, // plaintext body
      html: `<b>Hello ${usersName},</b><br>Your order has shipped!  Check order status and tracking here: <a href = 'http://www.sikrajewelry.com/orders/${orderId}'>${orderId}<a/>` // html body
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