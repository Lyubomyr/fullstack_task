import API from './api'

const StoriesService = {
  fetch: async () => {
    const data = await API.request(`/api/v1/stories`)
    return data
  }
}

export default StoriesService
