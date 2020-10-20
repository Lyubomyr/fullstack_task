import React from 'react'
import ArticlesProvider from './Context'
import Table from './Table'
import Form from './Form'
import Filters from './Filters'

const Articles = props => {
  return (
    <ArticlesProvider>
      <Filters />
      <Table />
      <hr />
      <Form />
    </ArticlesProvider>
  )
}

export default Articles
