import mongoose from 'mongoose'
// import dotenv from 'dotenv';

// dotenv.config()

const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.CONNECTION_URL,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    // console.log('MongoDB is now connected'.cyan.underline)
  } catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB