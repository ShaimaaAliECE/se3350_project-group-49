const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
    username: {
        type: String,
        require:true,
        unique:false
    },
    level: {
        type: Number,
        require:true
    },
    algorithm: {
        type: String,
        require:true,
    },
    time: {
        type: Number,
        reqiure:true,
    },
    lives: {
        type: Number,
        require: true,
    },
    success: {
        type: Boolean,
        require: true,
    },
    timestamp: {
        type: Number,
        require: true
    }
});

const Stats = mongoose.model('Stats', statSchema);

module.exports = Stats;