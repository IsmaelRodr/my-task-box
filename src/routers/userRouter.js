const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Cria um novo usuário
router.post('/', (req, res) => UserController.create(req, res));

// Busca usuários pelo nome - exemplo de uso: GET /users?name=Brutus
router.get('/', (req, res) => UserController.getByName(req, res));

// Busca usuário pelo ID
router.get('/:id', (req, res) => UserController.getById(req, res));

// Atualiza um usuário
router.put('/:id', authMiddleware, (req, res) => UserController.update(req, res));

// Exclui um usuário
router.delete('/:id', authMiddleware, (req, res) => UserController.delete(req, res));

module.exports = router;
