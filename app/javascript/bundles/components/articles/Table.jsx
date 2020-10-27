import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter'
import { ArticlesContext } from './Context'

const Table = observer(() => {
  const articlesContext = useContext(ArticlesContext)

  const columns = [{
      dataField: 'story.name',
      text: `Story name ${articlesContext.tableProps.group ? '(count)' : ''}`,
      sort: !articlesContext.tableProps.group,
      editable: false
    }, {
      dataField: 'article_type',
      text: `Type ${articlesContext.tableProps.group && articlesContext.tableProps.group !== 'article_type' ? '(first)' : ''}`,
      editable: !articlesContext.tableProps.group,
      sort: true,
      formatter: cell => { return articlesContext.tableProps.group ? cell : articlesContext.types.find(t => t.value === cell)?.label },
      editor: {
        type: Type.SELECT,
        options: articlesContext.types
      }
    }, {
      dataField: 'name',
      text: `Name ${articlesContext.tableProps.group && articlesContext.tableProps.group !== 'name' ? '(count)' : ''}`,
      editable: !articlesContext.tableProps.group,
      sort: true
    }, {
      dataField: 'text',
      text: `Text ${articlesContext.tableProps.group && articlesContext.tableProps.group !== 'text' ? '(count)' : ''}`,
      editable: !articlesContext.tableProps.group,
      sort: true
    }, {
      dataField: 'Actions',
      text: 'Actions',
      isDummyField: true,
      editable: false,
      hidden: articlesContext.tableProps.group?.length > 0,
      formatter: (cellContent, row) => {
        return (
          articlesContext.tableProps.group ? null : <button className="btn btn-default" onClick={() => articlesContext.deleteArticle(row) }>Remove</button>
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
      articlesContext.updateArticle({id: cellEdit.rowId, [cellEdit.dataField]: cellEdit.newValue})
    } else {
      articlesContext.updateTable({page, sortField, sortOrder, sizePerPage})
    }
  }

  return (
    <>
      <h3> Articles </h3>
      <BootstrapTable
        remote
        keyField="id"
        data={ articlesContext.articles }
        columns={ articlesContext.tableProps.group == 'story' ? groupedColumns : columns }
        defaultSorted={ defaultSorted }
        filter={ filterFactory() }
        pagination={ paginationFactory({ sizePerPage: articlesContext.tableProps.sizePerPage, page: articlesContext.tableProps.page, totalSize: articlesContext.totalSize }) }
        cellEdit={ cellEditFactory(cellEditProps) }
        onTableChange={ handleTableChange }
      />
    </>
  )
})

export default Table
