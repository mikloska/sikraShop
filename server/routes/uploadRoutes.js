import path from 'path'
import express from 'express'
import multer from 'multer'
import { uploadFile } from '../s3.js'
import util from 'util'
import fs from 'fs'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })
const unlinkFile = util.promisify(fs.unlink)

router.get('/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

router.post('/:category', upload.single('image'), async (req, res, next) => {
  // console.log('image post req.params:', req.params)
  const file = req.file
  // console.log(file)
  try{
    const result = await uploadFile(file, req.params.category)
    await unlinkFile(file.path)
    // console.log('result of picture upload: ',result)
    res.send({imagePath: `/images/${result.Key}`})
  }
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in image upload controller: ${error.message}`))
  }
})
// const router = express.Router()

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null, file.originalname
//       // `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`)
// })

export default router