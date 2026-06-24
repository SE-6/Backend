import { model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    image_url: {
      // type: String,
      type: [String],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export default model('Post', postSchema);
