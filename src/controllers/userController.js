const UserService = require('../services/userService');

class UserController {
  // Cria um novo usuário
  async create(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Busca usuários pelo nome (busca case-insensitive)
  async getByName(req, res) {
    try {
      // Extrai o nome da query string, por exemplo: /users?name=Brutus
      const { name } = req.query;
      const users = await UserService.getUsersByName(name);
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Busca usuário pelo ID
  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Atualiza um usuário existente
  async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Exclui um usuário pelo ID
  async delete(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
