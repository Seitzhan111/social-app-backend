import  mongoose from 'mongoose';

const postCommentsSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

export default mongoose.model('postComments', postCommentsSchema)