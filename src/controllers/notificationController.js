const Notification = require('../models/Notifications');

class NotificationController {
  // Listar notificações do usuário autenticado
  async getByUser(req, res) {
    try {
      const userId = req.user.id;
      const notifications = await Notification.find({ userId });
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar notificações' });
    }
  }

  // Criar nova notificação vinculada ao usuário
  async create(req, res) {
    try {
      const userId = req.user.id;
      const newNotification = new Notification({ ...req.body, userId });
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar notificação' });
    }
  }

  // Marcar notificação como lida, só se for do usuário
  async markAsRead(req, res) {
    try {
      const userId = req.user.id;
      const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, userId },
        { read: true },
        { new: true }
      );
      if (!notification) {
        return res.status(404).json({ error: 'Notificação não encontrada ou não pertence ao usuário' });
      }
      res.json(notification);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao marcar notificação como lida' });
    }
  }

  // Deletar notificação, só se for do usuário
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const notification = await Notification.findOneAndDelete({ _id: req.params.id, userId });
      if (!notification) {
        return res.status(404).json({ error: 'Notificação não encontrada ou não pertence ao usuário' });
      }
      res.json({ message: 'Notificação excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir notificação' });
    }
  }
}

module.exports = new NotificationController();
