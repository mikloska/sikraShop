import dotenv from 'dotenv'
import S3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'

dotenv.config();

const bucketName=process.env.AWS_BUCKET_NAME
const region=process.env.AWS_BUCKET_REGION
const accessKeyId=process.env.AWS_ACCESS_KEY
const secretAccessKey=process.env.AWS_SECRET_KEY

const s3=new S3({region, accessKeyId, secretAccessKey})

export const uploadFile=(file)=>{
  // let myFile = req.file.originalname.split(".")
  // const fileType = myFile[myFile.length - 1]
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    ContentType: file.mimetype,
    Bucket: bucketName,
    Body: fileStream,
    Key: `${file.originalname}`
  }

  return s3.upload(uploadParams).promise()
}



// downloads a file from s3
export const getFileStream=(fileKey)=>{
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
