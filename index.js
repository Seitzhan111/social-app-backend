import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import {loginUserValidation, registerUserValidation} from "./validations/validations.js";
import {login, register} from "./controller/auth.js";
import validationResult from "./services/validationResul.js";
import activeUser from "./controller/activeUser.js";
import {
    changeAvatarUrl,
    changeOneUser,
    deleteFriend,
    deleteOneUser,
    getAllUsers,
    getOneUser
} from "./controller/users.js";
import multer from 'multer';
import checkAuth from "./services/checkAuth.js";
import uploadFile from "./services/uploadFile.js";
import {v2 as cloudinary} from 'cloudinary';
import {addImages, deleteImages, getAllImages, setLikeImages} from "./controller/images.js";
import {addPost, changePost, deletePost, getAllPosts, getOnePost, setLikePosts} from "./controller/posts.js";
import {addPostComment, changePostComment, deletePostComment, getAllPostComments} from "./controller/postComments.js";
import {addRequest, callRequest, getMyInvite, getMyRequest} from "./controller/request.js";

const api = express()
dotenv.config() //Функция - для доступа к env файлу
const PORT = 4444 || process.env.PORT

//Middleware для доступа

api.use(express.json()) // middleware - для возможности перевода данных в нужный формат и доступ к req.body
api.use(cors()) // middleware - для возможности доступа из фронтенда на сервер
api.use('/uploads', express.static('uploads'))

// Настройка подключения MongoDB
mongoose.connect(process.env.MONGODB)
    .then(() => console.log('MongoDB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB ', err ))


// Загрузка фотографий

cloudinary.config({
    cloud_name: 'du6jnf6ry',
    api_key: '435168741224855',
    api_secret: 'IuuWWlL7r8fzn274G37OOYwCVu8'
});

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

api.post('/upload', upload.single('file'), uploadFile)



//auth

api.post('/register', registerUserValidation, validationResult, register)
api.post('/login', loginUserValidation, validationResult, login)
api.get('/active/:link', activeUser)


//users

api.get('/users', getAllUsers)
api.get('/users/:id', getOneUser)
api.patch('/users/:id', changeOneUser)
api.patch('/users/avatar/:id', changeAvatarUrl)
api.delete('/users/:id', deleteOneUser)
api.patch('/users/friend/:id', deleteFriend)


//images
api.get('/images', checkAuth, getAllImages)
api.post('/images', checkAuth, addImages)
api.delete('/images/:id', checkAuth, deleteImages)
api.patch('/images/like/:id', checkAuth, setLikeImages)

//posts

api.get('/posts', getAllPosts)
api.get('/posts/:id', getOnePost)
api.post('/posts', checkAuth, addPost)
api.patch('/posts/:id', changePost)
api.delete('/posts/:id', deletePost)
api.patch('/posts/like/:id', setLikePosts)


//postComment

api.post('/comments', addPostComment)
api.get('/comments', getAllPostComments)
api.patch('/comments/:id', changePostComment)
api.delete('/comments/:id', deletePostComment)

// Request for friends

api.post('/request', addRequest)
api.get('/my/request/:id', getMyRequest)
api.get('/my/invite/:id', getMyInvite)
api.patch('/call/request/:id', callRequest)



//Функция запуска сервера
const runServer = () => {
    try {
        api.listen(PORT, () => {
            console.log(`Сервер запущен на хосте http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(`Ошибка при запуске сервера - ${err.message}`)
    }
}

runServer()
