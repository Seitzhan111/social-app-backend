import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
})

export const sendActivationMail = async (to, link) => {
    await transporter.sendMail({
        from: process.env.MAILUSER,
        to,
        subject: `Активация аккаунта ${process.env.SERVERHOST}`,
        text: '',
        html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
    })
}

export const sendResetPasswordMail = async (to, link) => {
    await transporter.sendMail({
        from: process.env.MAILUSER,
        to,
        subject: `Сброс пароля ${process.env.SERVERHOST}`,
        text: '',
        html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
    })
}