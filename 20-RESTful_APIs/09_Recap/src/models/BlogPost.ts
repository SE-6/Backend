import { model, Schema } from 'mongoose';

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'please provide title'],
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
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

export default model('Blogpost', blogPostSchema);
