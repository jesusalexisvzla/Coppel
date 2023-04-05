const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    poliza:{
        idPoliza: mongoose.Schema.Types.ObjectId,
        ref: 'poliza'
    }
});

const Logs = mongoose.model('Logs', logsSchema)

module.exports = {
    Logs
}