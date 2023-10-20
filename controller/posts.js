import PostsModel from "../models/posts.js";

export const getAllPosts = async (req, res) => {
    try {

        let filter = {

        }

        if (req.query.creatorId) {
            filter.creatorId = req.query.creatorId
        }
        let posts = await PostsModel.find(filter)

        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: "Не удалось получить посты"
        })
    }
}

export const getOnePost = async (req, res) => {
    try {

        let post = await PostsModel.findById(req.params.id)

        res.json(post)

    } catch (err) {
        res.status(500).json({
            message: "Не удалось получить пост"
        })
    }
}

export const addPost = async (req, res) => {
    try {

        const creatorId = req.userId
        const body = {...req.body, creatorId}
        const post = await PostsModel(body)

        await post.save()

        res.json({message: "Пост добавлен", status: "success"})

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const changePost = async (req, res) => {
    try {

        const {_id, creatorId, ...other} = req.body

        const changedPost = await PostsModel.findByIdAndUpdate(req.params.id, other, {returnDocument: "after"})

        res.json(changedPost)

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось изменить пост'
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const existingPost = await PostsModel.findByIdAndRemove(req.params.id)

        if (existingPost) {
            res.json({
                message: "Пост удален",
                status: "success"
            })
        }

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const setLikePosts = async (req, res) => {
    try {

        const post = await PostsModel.findById(req.params.id)
        const userId = req.body.userId

        const checkExistingLike = post.likes.some(item => item === userId)

        if (!userId) {
            return res.status(400).json({
                message: "Идентификатор пользователя не опознан"
            })
        }

        const changedPosts = await PostsModel.findByIdAndUpdate(req.params.id, {
            likes: checkExistingLike ? post.likes.filter(item => item !== userId)
                : [...post.likes, userId]
        }, {returnDocument: "after"})

        if (changedPosts) {
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