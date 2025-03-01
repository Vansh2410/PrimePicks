const userModel = require("../../models/usermodel");
const bcrypt = require('bcryptjs');

async function usersignupcontroller(req, res) {
    try {
        const { email, password, name } = req.body;
        const user = await userModel.findOne({email});
        console.log("Req body", req.body)
        if(user){
            throw new Error("User Already Exists");
        }
        if (!email) {
            throw new Error("Please enter your email");
        }
        if (!password) {
            throw new Error("Please enter your password");
        }
        if (!name) {
            throw new Error("Please enter your name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully!"
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = usersignupcontroller