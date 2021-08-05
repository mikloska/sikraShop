import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema= mongoose.Schema({
  name: {
  type: String,
  required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
    },
  password: {
    type: String,
    required: true
    },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
    },
}, {
  //automatically create a 'Created At' and 'Updated At'
  timestamps: true
},
{ typeKey: '$type' }
)
//This does not work if it is an arrow function because of this.password
userSchema.methods.matchPW=async function(enteredPW){
  // console.log(await bcrypt.compare(enteredPW, this.password))
  return await bcrypt.compare(enteredPW, this.password)
}

//This will create middleware to happen before it is saved. Runs automatically, no need to be put into controller
userSchema.pre('save', async function(next) {
  //Check if password has not been modified and move on. Without this, existing passwords will be rehashed and we users won't be able to log in.
  if(!this.isModified('password')) return next()
  //First generate the salt, which makes a random string and means that the algo output won't be predictable and yield the same hash
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password, salt)
})
  

const User= mongoose.model('User', userSchema)
export default User;