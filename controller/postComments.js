import CommentsModel from "../models/comments.js";
import PostsModel from "../models/posts.js";


export const addPostComment = async (req, res) => {
    try {
        const postComment = await CommentsModel(req.body)

        await postComment.save()

        res.json({message: "Комментарий добавлен", status: "success"})

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const getAllPostComments = async (req, res) => {
    try {

        let filter = {

        }

        if (req.query.postId) {
            filter.postId = req.query.postId
        }

        let postComments = await CommentsModel.find(filter)

        res.json(postComments)
    } catch (err) {
        res.status(500).json({
            message: "Не удалось получить комментарий к посту"
        })
    }
}

export const changePostComment = async (req, res) => {
    try {

        const {_id, creatorId, postId, ...other} = req.body

        const changedPostComment = await CommentsModel.findByIdAndUpdate(req.params.id, other, {returnDocument: "after"})

        res.json(changedPostComment)

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось изменить комментарий к посту'
        })
    }
}

export const deletePostComment = async (req, res) => {
    try {
        const existingPostComment = await CommentsModel.findByIdAndRemove(req.params.id)

        if (existingPostComment) {
            res.json({
                message: "Комментарий удален",
                status: "success"
            })
        }

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}
