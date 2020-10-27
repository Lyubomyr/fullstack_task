import API from './api'

const ArticlesService = {
  fetchParams: "",

  fetch: async (params) => {
    const urlParams = params && params.length > 0 ? params : ArticlesService.fetchParams
    ArticlesService.fetchParams = urlParams
    const data = await API.request(`/api/v1/articles?${urlParams}`)
    return data
  },

  create: async (article) => {
    await API.post('/api/v1/articles', { payload: { article: article }})
    const data = await ArticlesService.fetch()
    return data
  },

  update: async (article) => {
    await API.patch(`/api/v1/articles/${article.id}`, {payload: { article: article }})
    const data = await ArticlesService.fetch()
    return data
  },

  remove: async (article) => {
    await API.delete(`/api/v1/articles/${article.id}`)
    const data = await ArticlesService.fetch()
    return data
  }
}

export default ArticlesService
