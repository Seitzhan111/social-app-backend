import jwt from "jsonwebtoken";

export default (id) => {
    return jwt.sign({
        _id: id
    }, 'secret4444', {expiresIn: '1d'})
}