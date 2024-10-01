import post from './post.model';

const getPostDB = async () => {
  return await post.find();
};

export const postService = {
  getPostDB,
};
