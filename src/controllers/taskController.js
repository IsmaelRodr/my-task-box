const Task = require('../models/Task');
const TaskService = require('../services/taskService');

class TaskController {
  // Busca todas as tarefas do usuário autenticado
  async getAll(req, res) {
    try {
      const userId = req.user.id;  // Vem do middleware authMiddleware
      const tasks = await Task.find({ userId });  // só tarefas do usuário
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  }

  // Busca uma tarefa pelo ID e garante que ela pertença ao usuário
  async getById(req, res) {
    try {
      const userId = req.user.id;
      const task = await Task.findOne({ _id: req.params.id, userId });
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  }

  async getTasksAdvanced(req, res) {
  try {
    const filters = {
      status: req.query.status,
      search: req.query.search,
      sortBy: req.query.sortBy,
      order: req.query.order,
    };

    const tasks = await TaskService.getTasksAdvanced(req.user.id, filters);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
}

  // Criar tarefa já vinculada ao usuário
  async create(req, res) {
    try {
      const userId = req.user.id;
      const newTask = new Task({ ...req.body, userId });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  }

  // Atualizar tarefa só se pertencer ao usuário
  async update(req, res) {
    try {
      const userId = req.user.id;
      const updatedTask = await Task.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada ou não pertence ao usuário' });
      }
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  }

  // Excluir tarefa só se pertencer ao usuário
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId });
      if (!deletedTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada ou não pertence ao usuário' });
      }
      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  }
}

module.exports = new TaskController();
