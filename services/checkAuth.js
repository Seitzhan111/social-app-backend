import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret4444') // проверка на наличии токена
            req.userId = decoded._id
            next()
        } catch (err) {
            return res.status(403).json({
                message: `Нет доступа - ${err}`
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }
}