const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed'] },
    priority: { type: String, required: true, enum: ['alta', 'media', 'baixa'] },
    type: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
