"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    uid: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        require: true
    },
    btitle: {
        type: String,
        require: true
    },
    bdesc: {
        type: String,
        require: true
    },
    bcat: {
        type: String,
        require: true
    },
    bphoto: {
        type: String,
    },
    bviews: {
        type: Number,
        default: 0
    },
    blikes: {
        type: [String],
        default: []
    },
    featured: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true });
const Blog = mongoose_1.default.model("Blog", BlogSchema);
exports.default = Blog;
