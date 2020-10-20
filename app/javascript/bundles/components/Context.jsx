import React, { createContext, useState, useEffect } from 'react'
import API from '../services/api'
import dialog from '../helpers/dialog'

export const ArticlesContext = createContext()

const ArticlesProvider = props => {
  const [types, setTypes] = useState([])
  const [stories, setStories] = useState([])
  const [articles, setArticles] = useState([])
  const [totalSize, setTotalSize] = useState(0)
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sizePerPage, setSizePerPage] = useState(25)

  useEffect(() => {
    getStories()
  }, [])

  useEffect(() => {
    getArticles()
  }, [page, sortField, sortOrder, sizePerPage])

  const updateTable = options => {
    setPage(options.page)
    setSortField(options.sortField)
    setSortOrder(options.sortOrder)
    setSizePerPage(options.sizePerPage)
  }

  const getStories = () => {
    API.request(`/api/v1/stories`, {
      onSuccess: response => {
        setStories(response.data.stories)
      },
      onFailure: () => {
        setArticles([])
      }
    })
  }

  const getArticles = options => {
    API.request(`/api/v1/articles?page=${page}&sort_field=${sortField}&sort_order=${sortOrder}&page_size=${sizePerPage}`, {
      onSuccess: response => {
        setArticles(response.data.articles)
        setTotalSize(response.data.total_count)
        setTypes(response.data.types)
      },
      onFailure: () => {
        setArticles([])
      }
    })
  }

  const createArticle = article => {
    API.post('/api/v1/articles', {
      payload: { article: article },
      onSuccess: response => {
        getArticles()
      }
    })
  }

  const updateArticle = article => {
    API.patch(`/api/v1/articles/${article.id}`, {
      payload: { article: article },
      onSuccess: response => {
        getArticles()
      }
    })
  }

  const deleteArticle = article => {
    dialog.confirm({
      message: 'Are you sure you want to delete this article?',
      callback: val => {
        if (val) {
          API.delete(`/api/v1/articles/${article.id}`, {
            onSuccess: response => {
              getArticles()
            }
          })
        }
      }
    })
  }

  const data = { types, stories, articles, page, totalSize, sortField, sortOrder, sizePerPage }
  const methods = { updateTable, getArticles, createArticle, updateArticle, deleteArticle }

  return (
    <ArticlesContext.Provider value={{ ...data, ...methods }}>
      { articles && types.length > 0 && props.children}
    </ArticlesContext.Provider>
  )
}

export default ArticlesProvider
