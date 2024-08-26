const mongoose = require('mongoose');



const connections = mongoose.connect("mongodb+srv://ahmadumer9126:umer123@cluster0.s5pzz.mongodb.net/kheldb?retryWrites=true&w=majority");

module.exports = {
    connections
}