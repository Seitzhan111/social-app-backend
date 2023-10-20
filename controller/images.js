import ImagesModel from "../models/images.js";
import PostsModel from "../models/posts.js";


export const getAllImages = async (req, res) => {
    try {
        let filter = {

        }

        if (req.query.creatorId) {
            filter.creatorId = req.query.creatorId
        }
        let images = await ImagesModel.find(filter)

        res.json(images)
    } catch (err) {
        res.status(500).json({
            message: "Не удалось получить картинку"
        })
    }
}

export const addImages = async (req, res) => {
    try {
        const creatorId = req.userId
        const body = {...req.body, creatorId}
        const image = await ImagesModel(body)

        await image.save()

        res.json({message: "Картинка добавлена", status: "success"})

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const deleteImages = async (req, res) => {
    try {
        const creatorId = req.userId
        const existingImage = await ImagesModel.findByIdAndRemove(req.params.id)

        if (existingImage) {
            res.json({
                message: "Картинка удалена",
                status: "success"
            })
        }

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const setLikeImages = async (req, res) => {
    try {

        const image = await ImagesModel.findById(req.params.id)
        const userId = req.body.userId

        const checkExistingLike = image.likes.some(item => item === userId)

        if (!userId) {
            return res.status(400).json({
                message: "Идентификатор пользователя не опознан"
            })
        }

        const changedImage = await ImagesModel.findByIdAndUpdate(req.params.id, {
            likes: checkExistingLike ?
                image.likes.filter(item => item !== userId)
                : [...image.likes, userId]
        }, {returnDocument: "after"})


        if (changedImage) {
            res.json({
                message: "Лайк добавлен", status: 'success'
            })
        }
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}