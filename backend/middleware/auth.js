import jwt from 'jsonwebtoken';

const authMiddleware = async(req,res,next) =>{

    const {token} = req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"not authorized .. Login again !"
        })
    }

    try {
        // since we passed id( jwt.sign (id,jwt_secret) )=>we get a token compromising of id
        // if we decode the token we get the id
        const token_decode = jwt.verify(token , process.env.JWT_SECRET);
        // console.log(token_decode);
        req.body.userId = token_decode.id;
        // console.log(req.body);
        next();

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Authz Error"
        })
    }

}

export default authMiddleware;