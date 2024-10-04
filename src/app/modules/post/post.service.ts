import user from '../user/user.modal';
import { TPostData } from './post.interface';
import post from './post.model';

const getAllPostDB = async () => {
  return await post.find().populate('user');
};

const getAPostDB = async (id: string) => {
  return await post.findById(id).populate('user');
};

const createPostDB = async (payload: TPostData, id: string) => {
  const data = { ...payload, user: id };
  const newPost = new post(data);

  await user.findByIdAndUpdate(id, { $inc: { posts: 1 } });

  return await newPost.save();
};

const getMyPostDB = async (id: string) => {
  return await post.find({ user: id });
};

export const postService = {
  getAllPostDB,
  getAPostDB,
  createPostDB,
  getMyPostDB,
};
