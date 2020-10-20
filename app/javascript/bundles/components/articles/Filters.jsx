import PropTypes from 'prop-types'
import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { ArticlesContext } from './Context'
import Select from 'react-select'
import { useDebouncedCallback } from 'use-debounce'

const Filters = props => {
  const { updateTable } = useContext(ArticlesContext)
  const debouncedUpdate = useDebouncedCallback(updateTable, 400)
  const [filters, setFilters] = useState({ search: '', group: 'none'})

  const groupBy = [
    { value: 'none', label: 'None' },
    { value: 'article_type', label: 'Type' },
    { value: 'name', label: 'Name' },
    { value: 'text', label: 'Text' },
    { value: 'story', label: 'Story' }
  ]

  const handleChange = (filter, newFilters) => {
    setFilters(newFilters)
    filter === 'search' ? debouncedUpdate.callback(newFilters) : updateTable(newFilters)
  }

  return (
    <>
      <Wrapper>
        <div className="form-group">
          <label>Search</label>
          <input
            className="form-control"
            value={filters.search}
            onChange={e => handleChange('search', {...filters, search: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Group</label>
          <StyledSelect
            options={groupBy}
            value={groupBy.filter(({value}) => value === filters.group)}
            onChange={type => handleChange('group', {...filters, group: type.value})}
          />
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
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

export default Filters
