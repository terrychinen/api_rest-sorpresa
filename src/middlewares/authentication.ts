import jwt from 'jsonwebtoken';

export const tokenValidation = (req, res, next) => {
    let token = req.get('token');
    //console.log(token);
    
    jwt.verify(token, process.env.SECRET, (err, decoded) =>{
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }
    
        req.user = decoded.user;
        next();    

    });  
    
}
    
