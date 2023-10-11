import UsersModel from "../models/users.js";
import ImagesModel from "../models/images.js";


export const getAllUsers = async (req, res) => {
    try {
        let filter = {
            // isActivated: true
        }

        let users = await UsersModel.find(filter)

        users = users.map(({avatar, name, surname, _id}) => {
            return {avatar, name, surname, _id}
        })

        res.json(users)

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить список пользователей'
        })
    }
}

export const getOneUser = async (req, res) => {
    try {
        const user = await UsersModel.findById(req.params.id)

        const {passwordHash, ...other} = user._doc

        res.json(other)

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить пользователя'
        })
    }
}

export const changeOneUser = async (req, res) => {
    try {

        const {email, isActivated, passwordHash, _id, avatar, images, ...other} = req.body

        const changedUser = await UsersModel.findByIdAndUpdate(req.params.id, other, {returnDocument: "after"})

        const {passwordHash:_, ...userData} = changedUser._doc

        res.json(userData)

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось изменить пользователя'
        })
    }
}

export const deleteOneUser = async (req, res) => {
    try {

        const existingUser = await UsersModel.findByIdAndRemove(req.params.id)

        if (existingUser) {
            res.json({
                status: 'success',
                message: 'Пользователь удален'
            })
        } else {
            res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось найти пользователя'
        })
    }
}

export const changeAvatarUrl = async (req, res) => {
    const newAvatarUrl = req.body.avatar

    const changedUserAvatar = await UsersModel.findByIdAndUpdate(req.params.id, {avatar: newAvatarUrl}, {returnDocument: "after"})

    const {passwordHash:_, ...userData} = changedUserAvatar._doc

    res.json(userData)
}

