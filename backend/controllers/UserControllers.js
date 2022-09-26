const User = require('../models/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const UserControllers = {
    // [POST] /user/register
    register: async (req, res) => {
        if(!req.body.username || !req.body.password) {
            return res.status(400).json({success: false, message: 'Khong duoc bo trong username hoac password'});
        }
        try {
            const user = await User.findOne({username: req.body.username});
            if(user){
                return res.status(400).json({success: false, message: "username da co roi"})
            }

            // thanh cong thi ma hoa pass
            const hashedPassword = await argon2.hash(req.body.password);

            // Tao ra user moi
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                admin: req.body.admin
            });
            
            // Luu vao MongoDB
            await newUser.save();

            // Tra ve Token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET);
            return res.json({success: true, message: "Dang ky user thanh cong", accessToken});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Loi ket noi server"});
        }
    },

    login: async (req, res) => {
        if(!req.body.username || !req.body.password){
            return res.status(400).json({success: false, message: 'Khong duoc bo trong username hoac password'});
        }
        try {
            // kiem tra username
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(400).json({success: false, message: "Khong dung username"})
            }

            // kiem tra password
            const passwordValid = await argon2.verify(user.password, req.body.password);
            if(!passwordValid){
                return res.status(401).json({success: false, message: "Khong dung password"})
            }

            // Tra ve token
            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
            return res.json({success: true, message: "Dang nhap thanh cong", accessToken});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Loi ket noi server"});
        }
    },

    // [GET] /user/
    get: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password');
            if(!user) {
                return res.status(400).json({success: false, message: "Khong co User"})
            }
            return res.json({success: true, user})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

}

module.exports = UserControllers;

