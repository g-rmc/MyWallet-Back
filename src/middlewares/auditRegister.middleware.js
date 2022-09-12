import { ObjectId } from 'mongodb';
import { stripHtml } from 'string-strip-html';

async function auditRegister(req, res, next){
    const registerId = stripHtml(req.params.ID_REGISTER).result;

    try {
        ObjectId(registerId)
    } catch (error) {
        return res.status(422).send('id inválido')
    }

    res.locals.registerId = registerId;

    next();
}

export { auditRegister };