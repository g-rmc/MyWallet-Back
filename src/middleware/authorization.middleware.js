import { db } from "../database/db.js";

async function userAuthorization(req, res, next){
    const { userId } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Token não enviado');
    }

    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session || session.userId.toString() !== userId.toString()) {
            return res.status(401).send('Sessão não encontrada');
        }
    } catch (error) {
        return res.status(500).send(error);
    }

    next();
}

export { userAuthorization };