const Task = require('../models/Task');

class TaskService {
  // Cria uma nova tarefa
  async createTask(data) {
    return await Task.create(data);
  }

  // Retorna todas as tarefas
  async getAllTasks() {
    return await Task.find();
  }

  // Busca uma tarefa pelo ID
  async getTaskById(id) {
    const task = await Task.findById(id);
    if (!task) throw new Error('Tarefa não encontrada');
    return task;
  }

  // Atualiza uma tarefa
  async updateTask(id, data) {
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    if (!task) throw new Error('Tarefa não encontrada');
    return task;
  }

  // Exclui uma tarefa
  async deleteTask(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new Error('Tarefa não encontrada');
    return task;
  }
}

module.exports = new TaskService();
