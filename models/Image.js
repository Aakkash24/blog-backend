"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});
const Image = mongoose.model('Image', imageSchema);
exports.default = Image;
