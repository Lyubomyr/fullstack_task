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
      text: `Story name ${tableProps.group ? '(count)' : ''}`,
      sort: !tableProps.group,
      editable: false
    }, {
      dataField: 'article_type',
      text: `Type ${tableProps.group && tableProps.group !== 'article_type' ? '(first)' : ''}`,
      editable: !tableProps.group,
      sort: true,
      formatter: cell => { return tableProps.group ? cell : types.find(t => t.value === cell)?.label },
      editor: {
        type: Type.SELECT,
        options: types
      }
    }, {
      dataField: 'name',
      text: `Name ${tableProps.group && tableProps.group !== 'name' ? '(count)' : ''}`,
      editable: !tableProps.group,
      sort: true
    }, {
      dataField: 'text',
      text: `Text ${tableProps.group && tableProps.group !== 'text' ? '(count)' : ''}`,
      editable: !tableProps.group,
      sort: true
    }, {
      dataField: 'Actions',
      text: 'Actions',
      isDummyField: true,
      editable: false,
      hidden: tableProps.group?.length > 0,
      formatter: (cellContent, row) => {
        return (
          tableProps.group ? null : <button className="btn btn-default" onClick={() => deleteArticle(row) }>Remove</button>
        )
      }
    }]

  const groupedColumns = [{
      dataField: 'story_name',
      text: 'Story name',
      sort: false,
      editable: false
    }, {
      dataField: 'article_count',
      text: 'Article count',
      editable: false,
      sort: false,
    }, {
      dataField: 'article_type_count',
      text: 'Article type count',
      editable: false,
      sort: false
    }, {
      dataField: 'last_created_article',
      text: 'Last created article',
      editable: false,
      sort: false
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
      console.log("updatetable", {page, sortField, sortOrder, sizePerPage})
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
        columns={ tableProps.group == 'story' ? groupedColumns : columns }
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
