import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
    image: {
        type: String,
        required: true,
        trim: true,
      }
})

const post = model<TPost>('Post', postSchema);

export default post;