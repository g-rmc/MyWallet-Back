import { db } from "../db/db.js";

async function userAuthorization(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Token não enviado');
    }

    try {
        const session = await db.collection('sessions').findOne({ token });
    
        if (!session) {        
            return res.status(401).send('Sessão não encontrada');
        }  
        res.locals.userId = session.userId;

    } catch (error) {    
        return res.status(500).send(error);
    }

    next();
}

export { userAuthorization };