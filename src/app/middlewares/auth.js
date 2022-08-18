import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeaders = req.headers.authorization

   // console.log(authHeaders)

    if (!authHeaders){
        return res.status(401).json({
            message:'Para acessar este serviça é necessário estar logado'})


    }

    const [, token ] = authHeaders.split(' ');
    //console.log(token)
    
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret); 
        req.useId = decoded.id;
        console.log(decoded)
        next();


    } catch (error){
        return res.status(401).json({
            message: 'Token inválido'
        })

    }

}