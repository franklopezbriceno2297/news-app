import React from 'react'
import useFetch from 'use-http'

import {
  Table,
  Button
} from 'antd'

import { 
  PlusCircleOutlined
} from '@ant-design/icons'

// Local Imports
import { apiRoutes, cacheBusting } from '../config/config'

// Component
const NewList = () => {
  // Fetch
  const {
    data: news,
    loading: newsLoading,
    // get: getTimesheets
  } = useFetch(`${apiRoutes.listNews}${cacheBusting()}`, [])

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
      // align: 'center'
      render: (text, record) => (
        <iframe
          title={record.title}
          width="300" 
          height="150"
          src={record.url}
        >
        </iframe>
      )
    }
    // {
    //   title: 'State',
    //   dataIndex: 'state',
    //   key: 'state',
    //   render: (state) => `${state?.name.charAt(0).toUpperCase()}${state?.name.slice(1)}`
    // }
  ]), [])

  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-3">
        <Button
          type="primary" 
          shape="round" 
          icon={(<PlusCircleOutlined />)} 
          size="large"
          // onClick={handlerNewTimesheet}
        >
          Add New 
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        rowKey={record => record.id}
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
