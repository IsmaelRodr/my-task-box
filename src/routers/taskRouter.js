const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  validateCategoryOwnership,
  validateTaskOwnership,
} = require('../middlewares/validationMiddleware');

// ✅ Rota de criação
router.post('/', authMiddleware, validateCategoryOwnership, (req, res) =>
  TaskController.create(req, res)
);

// ✅ ROTA DE BUSCA AVANÇADA - DEVE VIR ANTES DO ":id"
router.get('/search', authMiddleware, (req, res) =>
  TaskController.getTasksAdvanced(req, res)
);

// ✅ Listar todas
router.get('/', authMiddleware, (req, res) =>
  TaskController.getAll(req, res)
);

// ✅ Buscar por ID
router.get('/:id', authMiddleware, validateTaskOwnership, (req, res) =>
  TaskController.getById(req, res)
);

// ✅ Atualizar
router.put('/:id', authMiddleware, validateTaskOwnership, validateCategoryOwnership, (req, res) =>
  TaskController.update(req, res)
);

// ✅ Deletar
router.delete('/:id', authMiddleware, validateTaskOwnership, (req, res) =>
  TaskController.delete(req, res)
);

module.exports = router;
