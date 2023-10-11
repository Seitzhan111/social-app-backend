import ImagesModel from "../models/images.js";


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
        const image = await ImagesModel(req.body)

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
        const changedImage = await ImagesModel.findByIdAndUpdate(req.params.id, {
            $inc: {likes: 1}
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