import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter'
import { ArticlesContext } from './Context'

const Table = props => {
  const { types, articles, totalSize, tableProps, updateTable, updateArticle, deleteArticle, } = useContext(ArticlesContext)

  const columns = [{
      dataField: 'story.name',
      text: 'Story name',
      sort: true,
      editable: false
    }, {
      dataField: 'article_type',
      text: 'Type',
      sort: true,
      formatter: cell => { return types.find(t => t.value === cell).label },
      editor: {
        type: Type.SELECT,
        options: types
      }
    }, {
      dataField: 'name',
      text: 'Name',
      sort: true
    }, {
      dataField: 'text',
      text: 'Text',
      sort: true
    }, {
      dataField: 'Actions',
      text: 'Actions',
      isDummyField: true,
      editable: false,
      formatter: (cellContent, row) => {
        return (
          <button className="btn btn-default" onClick={() => deleteArticle(row) }>Remove</button>
        )
      }
    }]

  const defaultSorted = [{
    dataField: 'name',
    order: 'asc'
  }]

  const cellEditProps = {
    mode: 'click',
    blurToSave: true
  }

  const handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
    if (cellEdit) {
      updateArticle({id: cellEdit.rowId, [cellEdit.dataField]: cellEdit.newValue})
    } else {
      updateTable({page, sortField, sortOrder, sizePerPage})
    }
  }

  return (
    <>
      <h3> Articles </h3>
      <BootstrapTable
        remote
        keyField="id"
        data={ articles }
        columns={ columns }
        defaultSorted={ defaultSorted }
        filter={ filterFactory() }
        pagination={ paginationFactory({ sizePerPage: tableProps.sizePerPage, page: tableProps.page, totalSize }) }
        cellEdit={ cellEditFactory(cellEditProps) }
        onTableChange={ handleTableChange }
      />
    </>
  )
}

export default Table
