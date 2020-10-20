import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import React from 'react'
import ArticlesProvider from './Context'
import AddArticle from './AddArticle'
import Articles from './Articles'

const App = props => {
  return (
    <ArticlesProvider>
      <AddArticle />
      <Articles />
    </ArticlesProvider>
  )
}

export default App
