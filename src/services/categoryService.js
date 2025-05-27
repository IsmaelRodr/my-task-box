const Category = require('../models/Category');

class CategoryService {
  async createCategory(data) {
    return await Category.create(data);
  }

  async getAllCategories() {
    return await Category.find();
  }

  async getCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) throw new Error('Categoria não encontrada');
    return category;
  }

  async updateCategory(id, data) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) throw new Error('Categoria não encontrada');
    return category;
  }

  async deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new Error('Categoria não encontrada');
    return category;
  }
}

module.exports = new CategoryService();
