import  mongoose from 'mongoose';

const imagesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    creatorId: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

export default mongoose.model('images', imagesSchema)