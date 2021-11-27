import React from 'react'
import useFetch from 'use-http'
import { useNavigate } from 'react-router-dom'

import {
  Table,
  Button
} from 'antd'

import { 
  PlusCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons'

// Local Imports
import { 
  apiRoutes, 
  cacheBusting,
  categories
} from '../config/config'

// Component
const NewList = () => {
  //Hooks 
  const navigate = useNavigate()

  // Fetch
  const {
    data: news,
    loading: newsLoading,
    get: getNews
  } = useFetch(`${apiRoutes.listNews}${cacheBusting()}`, [])

  const {
    loading: deleteNewsLoading,
    delete: deleteNews
  } = useFetch()

  // Memos
  const columns = React.useMemo(() => ([
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      // align: 'center'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: categories.map(x => ({ text: x, value: x })),
      onFilter: (value, record) => (record.category.indexOf(value) === 0),
      // align: 'center'
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      // align: 'center'
    },
    {
      title: 'Video',
      dataIndex: 'url',
      key: 'url',
      // align: 'center',
      render: (text, record) => (
        <iframe
          title={record.title}
          width="300" 
          height="150"
          src={record.url}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        >
        </iframe>
      )
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (text, record) => (
        <div className="d-flex">
          <Button
            danger
            type="primary"
            shape="round" 
            disabled={deleteNewsLoading}
            icon={(<DeleteOutlined />)}
            onClick={async () => {
              const { _id } = record
              await deleteNews(`${apiRoutes.deleteNews}/${_id}`)
              getNews(cacheBusting())
            }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]), [deleteNews, deleteNewsLoading, getNews])

  // Callback
  const handlerAddNew = React.useCallback(() => {
    navigate('/addnew')
  }, [navigate])

  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-3">
        <Button
          type="primary" 
          shape="round" 
          icon={(<PlusCircleOutlined />)} 
          size="large"
          onClick={handlerAddNew}
        >
          Add New 
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        rowKey={record => record._id}
        dataSource={news}
        pagination={{
          disabled: true,
          hideOnSinglePage: true
        }}
        loading={(newsLoading)}
      />
    </>
  )
}

export default NewList
