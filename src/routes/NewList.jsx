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
        // columns={columns}
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
