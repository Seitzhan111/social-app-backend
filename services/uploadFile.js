import cloudinary from 'cloudinary';
import * as fs from "node:fs";

export default (req, res) => {

    const file = req.file
    if (!file) {
        res.status(404).send({message: "Файл не найден"})
    }

    const fileName = `${file.originalname}`
    const tempFilePath = `uploads/${fileName}`

    try {
        cloudinary.v2.uploader.upload(tempFilePath,
            function(error, result) {
                if (error) {
                    throw new Error(error)
                } else {
                    fs.unlinkSync(tempFilePath)
                    res.json({
                        status: "success",
                        message: "Файл добавлен",
                        url: result.secure_url
                    })
                }
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}