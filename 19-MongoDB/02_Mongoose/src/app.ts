import '#db';
import { Post, User } from '#models';

// CREATE

// const user = new User({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john@example.com',
// });

// const userToSave = await user.save();

// const newUser = await User.create({
//   firstName: 'Jane',
//   lastName: 'Doe',
//   email: 'jane@example.com',
// });

// console.log('User created:', newUser);

// const user2 = new User({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john2@example.com',
// });

// const existingUser = await User.findOne({ email: user2.email });
// if (existingUser) throw new Error('Email already exists');

// await user2.save();

// console.log('user successfully saved in DB');

// READ
// const allUSers = await User.find();
// console.log(allUSers);

// RELATIONSHIP

// CLEANUP
await User.deleteMany({ email: 'newuser@example.com' });
await Post.deleteMany({ title: 'My first blog post' });
console.log('🧹 Cleaned up');

// 1) Create a user
const newUser = await User.create({
  firstName: 'New',
  lastName: 'User',
  email: 'newuser@example.com',
});

// console.log('User created', newUser);

// 2) Create a post and link it to the user
const newPost = await Post.create({
  title: 'My first blog post',
  body: 'This is some content...',
  author: newUser._id,
});

console.log('Post created', newPost);

// 3) Get the post and populate user data
const postWithUser = await Post.findById(newPost._id).populate(
  'author',
  'firstName lastName email',
);

console.log(postWithUser);

const allPost = await Post.find().populate('author', 'firstName lastName');
console.log(allPost);
