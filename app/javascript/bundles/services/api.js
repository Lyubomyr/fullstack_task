import axios from 'axios'

class API {
  constructor() {
    this.endpoint = ''
  }

  patch(path, params = {}) {
    return this.request(path, { ...params, method: 'PATCH' })
  }

  post(path, params = {}) {
    return this.request(path, { ...params, method: 'POST' })
  }

  delete(path, params = {}) {
    return this.request(path, { ...params, method: 'DELETE' })
  }

  request(path, params = {}) {
    const method = params.method || 'GET'
    const contentType = params.contentType || 'application/json'

    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    return axios({
      url: `${this.endpoint}${path}`,
      method,
      headers: { 'content-type': contentType },
      data: params.payload
    })
  }
}

export default new API()
