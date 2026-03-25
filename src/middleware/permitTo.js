

const permitTo=(...roles)=>{
    return (req,res,next)=>{
        const userRole=req.user.role
        if(!roles.includes(userRole)){
            res.status(403).json({
                message:"you donot have permission for this. forbidden"
            })
        }else{
            next()
        }
    }

}

export default permitTo