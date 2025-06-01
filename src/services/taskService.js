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

  async getTasksAdvanced(userId, filters) {
  const query = { userId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    query.title = { $regex: filters.search, $options: 'i' };
  }

  let sortOptions = {};
  if (filters.sortBy) {
    const order = filters.order === 'desc' ? -1 : 1;
    sortOptions[filters.sortBy] = order;
  }

  return await Task.find(query).sort(sortOptions);
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
