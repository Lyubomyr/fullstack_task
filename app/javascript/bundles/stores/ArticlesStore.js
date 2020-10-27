import { makeObservable, observable, computed, action, runInAction } from "mobx"
import StoriesService from '../services/StoriesService'
import ArticlesService from '../services/ArticlesService'
import dialog from '../helpers/dialog'

class ArticlesStore {
  types = []
  stories = []
  articles = []
  totalSize = 0
  tableProps = {sortField: 'name',
               sortOrder: 'asc',
               sizePerPage: 25,
               page: 1,
               search: '',
               group: null}

  constructor(that) {
    makeObservable(this, {
      types: observable,
      stories: observable,
      articles: observable,
      totalSize: observable,
      tableProps: observable,
      updateTable: action,
      getStories: action,
      getArticles: action,
      createArticle: action,
      updateArticle: action,
      deleteArticle: action,
      tablePropsToStr: computed,
    })
  }

  get tablePropsToStr() {
    return `page=${this.tableProps.page}&sort_field=${this.tableProps.sortField}&sort_order=${this.tableProps.sortOrder}&page_size=${this.tableProps.sizePerPage}&search_text=${this.tableProps.search}&group=${this.tableProps.group}`
  }

  updateTable = (props) => {
    this.tableProps = {...this.tableProps, ...props}
  }

  getStories = async () => {
    const data = (await StoriesService.fetch()).data
    runInAction(() => {
      this.stories = data.stories
    })
  }

  getArticles = async () => {
    const data = (await ArticlesService.fetch(this.tablePropsToStr)).data

    runInAction(() => {
      this.articles = data.articles
      this.totalSize = data.total_count
      this.types = data.types
    })
  }

  createArticle = async (article) => {
    const data = (await ArticlesService.create(article)).data
    runInAction(() => {
      this.articles = data.articles
    })
  }

  updateArticle = async (article) => {
    const data = (await ArticlesService.update(article)).data
    runInAction(() => {
      this.articles = data.articles
    })
  }

  deleteArticle = async (article) => {
    dialog.confirm({
      message: 'Are you sure you want to delete this article?',
      callback: async val => {
        if (val) {
          const data = (await ArticlesService.remove(article)).data
          runInAction(() => {
            this.articles = data.articles
          })
        }
      }
    })
  }
}

export default new ArticlesStore()
