import  mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    creatorId: {
        type: String,
        // required: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
      type: String
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export default mongoose.model('posts', postsSchema)