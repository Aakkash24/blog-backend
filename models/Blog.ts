import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
    btitle:{
        type:String,
        require:true
    },
    bdesc:{
        type:String,
        require:true
    },
    bcat:{
        type:String,
        require:true
    },
    bphoto:{
        type:String,
    },
    bviews:{
        type:Number,
        default:0
    },
    blikes:{
        type:[String],
        default:[]
    },
    featured:{
        type:Boolean,
        default:0
    }
},{timestamps:true})


const Blog = mongoose.model("Blog",BlogSchema);
export default Blog;