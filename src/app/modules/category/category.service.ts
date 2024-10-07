import category from './category.model';
import { TCategory } from './category.interface';
import { Request } from 'express';

const getAllCategoryDB = async (req: Request) => {
  const limit = Number(req.query?.limit);
  let categoryData = category.find();
  if (limit) {
    categoryData = categoryData.limit(limit);
  }
  return await categoryData;
};

const createCategoryDB = async (payload: TCategory) => {
  return await category.create(payload);
};

export const categoryService = {
  getAllCategoryDB,
  createCategoryDB,
};
