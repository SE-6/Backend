import '#db';
import { Post, User } from '#models';
import { Types } from 'mongoose';

// const user = { name: 'Alice', age: 25 };
// await db.collection('users').insertOne(user)

// CREATE

// const user = new User({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
// });

// const existingUser = await User.findOne({ email: user.email });
// if (existingUser) throw new Error('Email already exists');

// const userToSave = await user.save();
// console.log('user created', userToSave);

// const newUser = await User.create({
//   firstName: 'Andrew',
//   lastName: 'Hashemi',
//   email: 'andrew.hashemi@example.com',
// });

// READ

// const allUsers = await User.find();
// console.log(allUsers);

// const findJohn = await User.find({ firstName: 'John' });
// console.log(findJohn);

// const findLeila = await User.find({ email: 'leila.ahmadi@example.com' });
// console.log(findLeila);

// const findById = await User.findByIdAndDelete('6a32866f27ba9634e12fb7ae');
// console.log(findById);

// UPDATE

// const updateJohn = await User.updateOne(
//   { email: 'john.doe@example.com' },
//   { firstName: 'jack' },
// );
// console.log(updateJohn);

// const userRole = await User.updateMany(
//   { lastName: 'Hashemi' },
//   { role: 'admin' },
// );
// console.log(userRole);

// const updateAli = await User.updateOne(
//   { _id: '6a328adc5bee372e24496166' },
//   { email: 'newemail@example.com', role: 'user' },
// );
// console.log(updateAli);

// const findByIdAndUpdate = await User.findByIdAndUpdate(
//   '6a328534da588375c32e76f0',
//   { firstName: 'updated againsssss' },
//   { returnDocument: 'after' },
// );

// console.log(findByIdAndUpdate);

// DELETE
// const deleteOne = await User.deleteOne({ email: 'john.doe@example.com' });
// console.log(deleteOne);

// await User.deleteMany({ lastName: 'Doe' });
// await User.findOneAndDelete({ email: 'john@example.com' });
// await User.findByIdAndDelete('someid')

// CLEAN UP!
await User.deleteMany({ email: 'yusif@example.com' });
await Post.deleteMany({ title: 'My first blog post' });
await Post.deleteMany({ title: 'My first second post' });

// 1) Create a user
const newUser = await User.create({
  firstName: 'Yusif',
  lastName: 'Rzaiev',
  email: 'yusif@example.com',
});

// console.log('User created', newUser);

// 2) Create a post and link it to the user
const newPost = await Post.create({
  title: 'My first blog post',
  body: 'This is some content....',
  author: newUser._id,
});

// console.log('Post created', newPost);

// 3) Get the post and look for user data to show? => POPULATE

const postWithUser = await Post.findById(newPost._id).populate(
  'author',
  'firstName lastName email',
);

// console.log(postWithUser);

const allPosts = await Post.find().populate('author', 'firstName lastName');
console.log(allPosts);

// const post = await Post.findById(postId)
//     .populate('author', 'firstName lastName')
//     .populate('category', 'name')
//     .populate('tags', 'label')

// OBJECTID

// const user = await User.findOne({ email: 'john@example.com' });
