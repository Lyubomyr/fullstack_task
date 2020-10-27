import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ArticlesContext } from './Context'
import consumer from '../../../channels/consumer'
import Table from './Table'
import Form from './Form'
import Filters from './Filters'

const Articles = observer(props => {
  const { tableProps, getArticles, getStories } = useContext(ArticlesContext)

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

  return (
    <>
      <Filters />
      <Table />
      <hr />
      <Form />
    </>
  )
})

export default Articles
