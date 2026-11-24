const BaseService = require('./BaseService');

class UserService extends BaseService {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request, '/users');
  }

  async getAllUsers(params = {}) {
    return await this.get('', { params });
  }

  async getUserById(id) {
    return await this.get(id.toString());
  }

  async createUser(userData) {
    return await this.post('', userData);
  }

  async updateUser(id, userData) {
    return await this.put(id, userData);
  }

  async partialUpdateUser(id, partialData) {
    return await this.patch(id, partialData);
  }

  async deleteUser(id) {
    return await this.delete(id);
  }
}

module.exports = UserService;
