const jobschool =require('../models/User')
const bcrypt =require('bcryptjs')
const baderror =require('../errors/bad-request')
const unatherror =require('../errors/unauthenticated')

const login =async(req,res)=>{
    const{email,password} =req.body
    if(!email||!password)
    {
        throw new baderror("provide both email and pwd")
    }

    const user= await jobschool.findOne({email}) 
    

    if(!user){
       throw new unautherror('invalid credientials')
    }

    const pwdmatch =await user.cmpwd(password)
    
    if(!pwdmatch){
        throw new unautherror('invalid credientials')
    }


    const token =user.createjwt()
    
    res.json({user:{name:user.name},token})

}

const register =async(req,res)=>{


    const user =await jobschool.create({...req.body})
    const token =user.createjwt()
    res.json({user:{name:user.name},token})

            
       
}

module.exports ={login,register,}