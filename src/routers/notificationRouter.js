const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateNotificationOwnership } = require('../middlewares/validationMiddleware');

router.get('/user/:userId', authMiddleware, (req, res) => NotificationController.getByUser(req, res)); // Só precisa estar autenticado
router.post('/', authMiddleware, (req, res) => NotificationController.create(req, res));
router.put('/:id/read', authMiddleware, validateNotificationOwnership, (req, res) => NotificationController.markAsRead(req, res));
router.delete('/:id', authMiddleware, validateNotificationOwnership, (req, res) => NotificationController.delete(req, res));

module.exports = router;
