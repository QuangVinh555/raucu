const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({success: false, message: "Khong co Access token"});
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ status: false, message: 'Invalid Token'});
    }

    // const token = req.headers.token;
    // if(token) {
    //     const accessToken = token.split(' ')[1];
    //     // kiểm tra đúng token không 
    //     jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
    //         if(err) {
    //             res.status(403).json("Token đã hết hạn");
    //         }
    //         req.user = user;
    //         next();     // thõa hết điều kiện mới được đi tiếp
    //     })
    // }
    // else {
    //     res.status(401).json("Không có Token");
    // }
}

module.exports = verifyToken;