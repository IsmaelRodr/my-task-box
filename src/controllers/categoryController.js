const Category = require('../models/Category');

class CategoryController {
  // Listar categorias do usuário autenticado
  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const categories = await Category.find({ userId });
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  // Buscar categoria pelo ID, só se for do usuário
  async getById(req, res) {
    try {
      const userId = req.user.id;
      const category = await Category.findOne({ _id: req.params.id, userId });
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada ou não pertence ao usuário' });
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  // Criar categoria vinculada ao usuário
  async create(req, res) {
    try {
      const userId = req.user.id;
      const newCategory = new Category({ ...req.body, userId });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  }

  // Atualizar categoria só se pertencer ao usuário
  async update(req, res) {
    try {
      const userId = req.user.id;
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada ou não pertence ao usuário' });
      }
      res.json(updatedCategory);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  // Excluir categoria só se pertencer ao usuário
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const deletedCategory = await Category.findOneAndDelete({ _id: req.params.id, userId });
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada ou não pertence ao usuário' });
      }
      res.json({ message: 'Categoria excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir categoria' });
    }
  }
}

module.exports = new CategoryController();
