import { Request } from 'express';
import user from '../user/user.modal';
import post from '../post/post.model';

const myAccountDB = async (req: Request) => {
  const { email, id } = req.user;
  const upvoteData = await post.aggregate([
    {
      $match: {
        user: id,
      },
    },
    {
      $project: {
        upvote: 1,
        upvoteCount: { $size: '$upvote' },
      },
    },
    {
      $sort: { upvoteCount: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const result = await user.findOne({ email });
  return {
    data: result,
    upvoteData: upvoteData.length > 0 ? upvoteData[0] : null,
  };
};

const myFollowersDB = async (req: Request) => {
  const id = req.user?.id;
  const isExist = await user.findById(id);

  const result = await user.find({
    _id: { $in: isExist?.followers },
  });
  return result;
};

const myFollowingDB = async (req: Request) => {
  const id = req.user?.id;
  const isExist = await user.findById(id);

  const result = await user.find({
    _id: { $in: isExist?.following },
  });
  return result;
};

const allUserDB = async () => {
  const result = await user.find();
  return result;
};

const getAUserDB = async (req: Request) => {
  const id = req.params.id;
  const result = await user.findById(id);
  return result;
};

export const userService = {
  myAccountDB,
  allUserDB,
  myFollowingDB,
  myFollowersDB,
  getAUserDB,
};
