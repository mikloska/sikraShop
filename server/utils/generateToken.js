import jwt from 'jsonwebtoken'

//Pass in id, bc it will be the token payload
const generateToken = (id) => {
  //Create token with id as first arg and secret to env file and second arg, third is expiration
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

export default generateToken