import { model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    image_url: {
      type: String,
    },
    image_public_id: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('Post', postSchema);
