import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
        
    },
    thumbnail:{
        type:String,
        required:true,
    },
   description:{
        type:String,
        required:true,
        
    },
    title:{
        type:String,
        required:true,
        
    },
   duration:{
        type: Number,
        required:true,
        
    },
   views:{
        type:Number,
        default:0,
        
    },
    isPublshed:{
        type:Boolean,
        default:true,
    },
    owner:{
             type: mongoose.Schema.Types.ObjectId,
             ref :'User'
    }
},{timestamps:true});
//timestamps is used to store the time when the data is created and updated
//it is a plugin that is used to paginate the data

videoSchema.plugin(mongooseAggregatePaginate);
//mongooseAggregatePaginate is a plugin that is used to paginate the data
export const Video = mongoose.model("Video",videoSchema)




