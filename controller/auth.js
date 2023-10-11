import UsersModel from "../models/users.js";
import bcryptPass from "../services/bcryptPass.js";
import jwt from "jsonwebtoken";
import {sendActivationMail} from "../services/mail-service.js";
import accessToken from "../services/accessToken.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
    try {
        const {password, ...user} = req.body

        const findUser = await UsersModel.findOne({
            email: user.email
        })
        if (findUser) {
            return res.status(400).json({
                message: 'Такой аккаунт уже существует'
            })
        }
            const passwordHash = await bcryptPass(password)

            const activeLink = uuidv4()

            const doc = await UsersModel({
                ...user,
                passwordHash,
                activateLink: activeLink
            })

            await sendActivationMail(user.email, `http://localhost:4444/active/${activeLink}`)

            const createdUser = await doc.save()

            const  token = accessToken(createdUser._id)

            const {passwordHash:_, activateLink, ...userData} = createdUser._doc

            res.json({
                user: userData,
                token
            })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const login = async (req, res) => {
    try {
        const existingUser = await UsersModel.findOne({email: req.body.email})

        if (!existingUser) {
            return res.status(404).json({
                message: 'Такого аккаунта не существует'
            })
        }

        const inValidPass = await bcrypt.compare(req.body.password, existingUser._doc.passwordHash)

        if (!inValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = accessToken(existingUser._id)

        const {passwordHash, ...userData} = existingUser._doc

        res.json({
            user: userData,
            token
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось войти в аккаунт'
        })
    }
}