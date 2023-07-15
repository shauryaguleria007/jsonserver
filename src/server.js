require("dotenv").config()

const express = require("express")
const { connectDataBase } = require("./db")
const AsyncErrorHandler = require("./AsyncErrorHandler")
const JsonModel = require("./jsonModal")
const jsonModal = require("./jsonModal")
const server = express()


server.use(express.json())
server.post("/upload", AsyncErrorHandler(async (req, res, next) => {
    const uploadData = { ...req.body }
    if (Object.keys(uploadData).length === 0)
        throw new Error("")
    const data = await jsonModal.create({ data: uploadData })
    return res.status(200).json({
        id: data.id
    })
}))
server.get("/download", AsyncErrorHandler(async (req, res, next) => {
    const data = await jsonModal.find()
    if (!data) throw new Error("")
    return res.status(200).json(data)
}))
server.use((err, req, res, next) => {
    return res.status(400).json({
        error: "server error"
    })
})


const startServer = async () => {
    await connectDataBase().then(() => {
        server.listen(process.env.PORT, () => {
            console.log("server started at port " + process.env.PORT);
        })
    }).catch((error) => {
        console.log(error.message);
    })
}




startServer()