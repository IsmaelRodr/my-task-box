const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  validateCategoryOwnership,
  validateTaskOwnership,
} = require('../middlewares/validationMiddleware');

router.post('/', authMiddleware, validateCategoryOwnership, (req, res) =>
  TaskController.create(req, res)
);

router.get('/', authMiddleware, (req, res) =>
  TaskController.getAll(req, res)
);

router.get('/:id', authMiddleware, validateTaskOwnership, (req, res) =>
  TaskController.getById(req, res)
);

router.put('/:id', authMiddleware, validateTaskOwnership, validateCategoryOwnership, (req, res) =>
  TaskController.update(req, res)
);

router.delete('/:id', authMiddleware, validateTaskOwnership, (req, res) =>
  TaskController.delete(req, res)
);

module.exports = router;
