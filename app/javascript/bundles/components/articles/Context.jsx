import React, { createContext, useState, useEffect } from 'react'
import API from '../../services/api'
import dialog from '../../helpers/dialog'
import consumer from '../../../channels/consumer'

export const ArticlesContext = createContext()

const ArticlesProvider = props => {
  const [types, setTypes] = useState([])
  const [stories, setStories] = useState([])
  const [articles, setArticles] = useState([])
  const [totalSize, setTotalSize] = useState(0)
  const [tableProps, setTableProps] = useState({ sortField: 'name',
                                                 sortOrder: 'asc',
                                                 sizePerPage: 25,
                                                 page: 1,
                                                 search: '',
                                                 group: null })

  useEffect(() => {
    getStories()

    const subscription = consumer.subscriptions.create("ArticlesChannel", {
      received(data) {
        getArticles()
      }
    })

    return () => {
      if (subscription) consumer.subscriptions.remove(subscription)
    }
  }, [])

  useEffect(() => {
    getArticles()
  }, [tableProps])


  const updateTable = props => {
    setTableProps({...tableProps, ...props})
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

  const tablePropsToStr = () => {
    return `page=${tableProps.page}&sort_field=${tableProps.sortField}&sort_order=${tableProps.sortOrder}&page_size=${tableProps.sizePerPage}&search_text=${tableProps.search}&group=${tableProps.group}`
  }

  const getArticles = () => {
    API.request(`/api/v1/articles?${tablePropsToStr()}`, {
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

      }
    })
  }

  const updateArticle = article => {
    API.patch(`/api/v1/articles/${article.id}`, {
      payload: { article: article },
      onSuccess: response => {

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

            }
          })
        }
      }
    })
  }

  const data = { types, stories, articles, totalSize, tableProps }
  const methods = { getArticles, createArticle, updateArticle, deleteArticle, updateTable }

  return (
    <ArticlesContext.Provider value={{ ...data, ...methods }}>
      { articles && types.length > 0 && props.children}
    </ArticlesContext.Provider>
  )
}

export default ArticlesProvider
