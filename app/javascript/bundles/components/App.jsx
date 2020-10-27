import React from 'react'
import styled from 'styled-components'
import ArticlesProvider from './articles/Context'
import Articles from './articles'

const App = props => {
  return (
    <Layout>
      <ArticlesProvider>
        <Articles />
      </ArticlesProvider>
    </Layout>
  )
}

const Layout = styled.div`
  margin: 0px auto;
  padding: 20px;
`

export default App
