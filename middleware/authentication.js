const jobschool =require('../models/User')
const jwt =require('jsonwebtoken')
const {UnauthenticatedError} =require('../errors')


const auth =async (req,res,next)=>{

const autheader =req.headers.authorization

if(!autheader||!autheader.startsWith('Bearer') ){
    throw new UnauthenticatedError('Authentication invalid 1')
    

}   


const token =autheader.split(' ')[1]

try{
    const payload =jwt.verify(token,'jwtsecret')
    console.log(payload)
    req.user ={userid:payload.userid,name:payload.username}
    next()


}
catch(error){
    throw new Unauthenticatederror('Authentication Invalid 2')
}


}

module.exports =auth
