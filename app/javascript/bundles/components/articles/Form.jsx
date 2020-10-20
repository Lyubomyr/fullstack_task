import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ArticlesContext } from './Context'
import Select from 'react-select'

const Form = props => {
  const { types, stories, createArticle, getArticles } = useContext(ArticlesContext)
  const [article, setArticle] = useState({ story_id: stories[0]?.id,
                                           article_type: types[0]?.value,
                                           name: '',
                                           text: '' })

  const handleSave = () => {
    createArticle(article)
    getArticles()
  }

  return (
    <>
      <h3> Create new Article: </h3>
      <FormWrapper>
        <div className="form-group">
          <label>Story Name</label>
            <StyledSelect
              options={stories}
              getOptionValue={({id}) => id}
              getOptionLabel={({name}) => name}
              value={stories.filter(({id}) => id === article.story_id)}
              onChange={story => setArticle({...article, story_id: story.id})}
            />
        </div>
        <div className="form-group">
          <label>Type</label>
          <StyledSelect
            options={types}
            value={types.filter(({value}) => value === article.article_type)}
            onChange={type => setArticle({...article, article_type: type.value})}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            value={article.name}
            onChange={e => setArticle({...article, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Text</label>
          <input
            className="form-control"
            value={article.text}
            onChange={e => setArticle({...article, text: e.target.value})}
          />
        </div>
        <button className="btn btn-primary" onClick={ handleSave }> Save </button>
      </FormWrapper>
    </>
  )
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  justify-content: flex-start;
  align-items: flex-end;

  > div {
    margin: 0px 10px;
  }
`

const StyledSelect = styled(Select)`
  width: 180px;
`

export default Form
