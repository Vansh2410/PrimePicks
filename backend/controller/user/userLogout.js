// const userModel = require("../models/usermodel")
async function userLogout(req,res){
    try{
        // const user = await userModel.findById(req)
        res.clearCookie("token")

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data: []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}
module.exports = userLogout