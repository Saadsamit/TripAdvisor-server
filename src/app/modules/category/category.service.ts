import category from './category.model';
import { TCategory } from './category.interface';

const getAllCategoryDB = async () => {
    return await category.find();
  };

const createCategoryDB = async (payload: TCategory) => {
  return await category.create(payload);
};

export const categoryService = {
    getAllCategoryDB,
  createCategoryDB,
};
