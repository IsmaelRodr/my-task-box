const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(data) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    return await User.create(data);
  }
  async getUsersByName(name) {
    if (!name) throw new Error('Nome é necessário para a busca');
    // Busca no banco usando regex para tornar a busca case-insensitive
    return await User.find({ name: { $regex: name, $options: 'i' } });
  }

  async getUserById(id) {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('Usuário não encontrado');
  return user;
}

  async updateUser(id, data) {
    const saltRounds = 10;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }
}

module.exports = new UserService();
