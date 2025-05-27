const Task = require('../models/Task');
const Category = require('../models/Category');
const Notification = require('../models/Notification');

async function validateCategoryOwnership(req, res, next) {
  const userId = req.user.id;
  const { categoryId } = req.body;

  if (!categoryId) return next();

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ error: 'Categoria não encontrada' });
    if (category.user.toString() !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para usar esta categoria' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar categoria' });
  }
}

async function validateTaskOwnership(req, res, next) {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para acessar essa tarefa' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar tarefa' });
  }
}

async function validateNotificationOwnership(req, res, next) {
  const userId = req.user.id;
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ error: 'Notificação não encontrada' });
    if (notification.user.toString() !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para acessar essa notificação' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar notificação' });
  }
}

module.exports = {
  validateCategoryOwnership,
  validateTaskOwnership,
  validateNotificationOwnership,
};
