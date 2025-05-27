const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, (req, res) => CategoryController.create(req, res));
router.get('/', authMiddleware, (req, res) => CategoryController.getAll(req, res));
router.get('/:id', authMiddleware, (req, res) => CategoryController.getById(req, res));
router.put('/:id', authMiddleware, (req, res) => CategoryController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => CategoryController.delete(req, res));

module.exports = router;
