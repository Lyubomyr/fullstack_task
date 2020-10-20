import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import styled from 'styled-components'
import Articles from './articles'

const App = props => {
  return (
    <Layout>
      <Articles />
    </Layout>
  )
}

const Layout = styled.div`
  margin: 0px auto;
  padding: 20px;
`

export default App
