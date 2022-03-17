const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique:true,
        minlength:3
    },
    level: {
        type: Number,
        required:true
    },
    algorithm: {
        type: String,
        required:true,
    },
    algorithm: {
        type: String,
        required:true,
    },
    time: {
        type: Number,
        reqiured:true,
    },
    lives: {
        type: Number,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
    timestamp: {
        type: timestamp,
        required: true,
    }
});

const Stats = mongoose.model('Stats', statSchema);

module.exports = Stats;