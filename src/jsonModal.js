const { json } = require("express")
const mongoose = require("mongoose")

const jsonSchema = new mongoose.Schema({
    data: [{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }]
})

module.exports = mongoose.model("data", jsonSchema)