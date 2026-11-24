class BaseService {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} endpoint
   */
  constructor(request, endpoint = '') {
    this.request = request;
    this.endpoint = endpoint;
  }

  /**
   * @param {string} [path]
   * @param {object} [options]
   */
  async get(path = '', options = {}) {
    const url = path ? `${this.endpoint}/${path}` : this.endpoint;
    return await this.request.get(url, options);
  }

  /**
   * @param {string|object} [pathOrData]
   * @param {object} [data]
   * @param {object} [options]
   */
  async post(pathOrData, data, options = {}) {
    let url = this.endpoint;
    let postData = data;
    let requestOptions = options;

    if (typeof pathOrData === 'string') {
      url = pathOrData ? `${this.endpoint}/${pathOrData}` : this.endpoint;
    } else {
      postData = pathOrData;
      requestOptions = data || {};
    }

    return await this.request.post(url, {
      data: postData,
      ...requestOptions,
    });
  }

  /**
   * @param {string|number} id
   * @param {object} data
   * @param {object} [options]
   */
  async put(id, data, options = {}) {
    const url = `${this.endpoint}/${id}`;
    return await this.request.put(url, {
      data,
      ...options,
    });
  }

  /**
   * @param {string|number} id
   * @param {object} data
   * @param {object} [options]
   */
  async patch(id, data, options = {}) {
    const url = `${this.endpoint}/${id}`;
    return await this.request.patch(url, {
      data,
      ...options,
    });
  }

  /**
   * @param {string|number} id
   * @param {object} [options]
   */
  async delete(id, options = {}) {
    const url = `${this.endpoint}/${id}`;
    return await this.request.delete(url, options);
  }
}

module.exports = BaseService;
