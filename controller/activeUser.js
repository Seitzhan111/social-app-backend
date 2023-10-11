import UsersModel from "../models/users.js";

export default async (req, res) => {
    try {
        const user = await UsersModel.findOneAndUpdate({activateLink: req.params.link}, {$set:{
                isActivated: true
            }, $unset:{activateLink: 1}}, {new: true});
        if (user) {
            res.redirect('https://gmail.com')
        } else {
            throw new Error('Такой ссылки не существует')
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}