import RequestModel from '../models/request.js';
import UsersModel from "../models/users.js";


export const addRequest = async (req, res) => {
    try {
        const request = await RequestModel(req.body)

        await request.save()

        res.json({
            message: "Запрос отправлен",
            status: "success"
        })

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const getMyRequest = async (req, res) => {
    try {
        const request = await RequestModel.findOne({senderId: req.params.id})
        res.json(request)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить запрос'
        })
    }
}

export const getMyInvite = async (req, res) => {
    try {
        const invite = await RequestModel.findOne({receiverId: req.params.id})
        res.json(invite)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить запрос'
        })
    }
}

export const callRequest = async (req, res) => {
    try {
       const answer = req.body.answer
       const request = await RequestModel.findById(req.params.id)

        await RequestModel.findByIdAndRemove(req.params.id)

       if (answer) {
           const senderId = await UsersModel.findById(request.senderId)
           await UsersModel.findByIdAndUpdate(request.senderId, {
               friends: [...senderId.friends, request.receiverId]
           })
           const receiverId = await UsersModel.findById(request.receiverId)
           await UsersModel.findByIdAndUpdate(request.receiverId, {
               friends: [...receiverId.friends, request.senderId]
           })
           return res.json({
               message: 'Запрос принят',
               status: "success"
           })
       }
        return res.json({
            message: 'Запрос отклонен',
            status: "field"
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить запрос'
        })
    }
}