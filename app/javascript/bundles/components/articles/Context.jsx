import React, { createContext } from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import ArticlesStore from '../../stores/ArticlesStore'

export const ArticlesContext = createContext()

const ArticlesProvider = props => {
  return (
    <ArticlesContext.Provider value={ArticlesStore}>
      {props.children}
    </ArticlesContext.Provider>
  )
}

export default ArticlesProvider
