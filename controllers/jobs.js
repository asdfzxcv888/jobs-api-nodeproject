const nun =require('../models/job')
const notfound =require('../errors/not-found')


const getalljobs=async(req,res)=>{
    const jobs =await nun.find({createdBy:req.user.userid}).sort('createdAt')

    res.json(jobs);
}


const getjob=async(req,res)=>{
    const jobid =req.params
    

    const job =await nun.find({createdBy:req.user.userid,_id:jobid.id})
res.json(job);
}



const updatejob=async(req,res)=>{
    const {company,position} =req.body
    const jobid =req.params.id
    const job =await nun.findByIdAndUpdate({_id:jobid,createdBy:req.user.userid}, {company,position},{new:true,runValidators:true})

res.json(job);
}



const deletejob=async(req,res)=>{
    const jobid =req.params.id

    const job =await nun.findByIdAndRemove({_id:jobid,createdBy:req.user.userid})
    if(!job){
        throw new notfound('no such job with id'+jobid)
    }

res.send('delete job');
}



const createjob = async(req,res)=>{
    const job =await nun.create({...req.body, createdBy:req.user.userid})
    console.log(job)

res.json(job);
}

module.exports={getalljobs,getjob,updatejob,deletejob,createjob}