const Notification = require('../models/Notification');

class NotificationService {
  async createNotification(data) {
    return await Notification.create(data);
  }

  async getNotificationsByUser(userId) {
    return await Notification.find({ userId });
  }

  async markAsRead(notificationId) {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
    if (!notification) throw new Error('Notificação não encontrada');
    return notification;
  }

  async deleteNotification(notificationId) {
    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) throw new Error('Notificação não encontrada');
    return notification;
  }
}

module.exports = new NotificationService();
