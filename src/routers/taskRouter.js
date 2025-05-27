const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  validateCategoryOwnership,
  validateTaskOwnership,
} = require('../middlewares/validationMiddleware');

// ✅ Cria uma nova tarefa
router.post('/', authMiddleware, validateCategoryOwnership, (req, res) =>
  TaskController.create(req, res)
);

// ✅ Lista todas as tarefas do usuário autenticado
router.get('/', authMiddleware, (req, res) =>
  TaskController.getAll(req, res)
);

// ✅ Busca uma tarefa pelo ID (verifica propriedade)
router.get('/:id', authMiddleware, validateTaskOwnership, (req, res) =>
  TaskController.getById(req, res)
);

// ✅ Atualiza uma tarefa (verifica propriedade + categoria)
router.put('/:id', authMiddleware, validateTaskOwnership, validateCategoryOwnership, (req, res) =>
  TaskController.update(req, res)
);

// ✅ Exclui uma tarefa (verifica propriedade)
router.delete('/:id', authMiddleware, validateTaskOwnership, (req, res) =>
  TaskController.delete(req, res)
);

module.exports = router;
