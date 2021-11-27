import React from 'react'
import useFetch from 'use-http'

import { 
  Typography,
  Form,
  Card,
  Input,
  Button,
  Select,
  notification
} from 'antd'

import { SaveOutlined } from '@ant-design/icons'

// Local Imports
import {
  apiRoutes, 
  cacheBusting,
  categories
} from '../config/config'

const { Title } = Typography
const { Option } = Select

function AddNew() {
  // Hooks
  const [form] = Form.useForm()

  // Memos
  // const categories = React.useMemo(() => (
  //   [
  //     'politics',
  //     'sports', 
  //     'economy',
  //     'culture',
  //     'social',
  //     'showbiz',
  //     'police',
  //     'legal',
  //     'scientific',
  //     'health',
  //     'technology',
  //     'education',
  //     'environment'
  //   ].sort()
  // ), [])

  // Fetch
  const {
    response: newsResponse,
    loading: newsLoading,
    post: postNew,
    error: newsError
  } = useFetch(apiRoutes.addNews)

  // Callbacks
  const onFinish = React.useCallback(async (values) => {
    let { title, url, language, category } = values

    title = title.trim()
    url = url.trim()
    language = language.trim()
    category = category.trim()

    if (title && url && language && category) {
      const data = { title, url, language, category, video: '' }
      
      await postNew(cacheBusting(), data)

      const { ok } = newsResponse
      console.log('newResponse', newsResponse)

      if (ok) {
        
        notification.success({ message: 'News added successfully' })
        form.resetFields()
        // navigate('/')
      } else {
        notification.error({ message: newsError })
      }
    } else {
      notification.error({ message: 'All fields are required!' })
    }
  }, [postNew, newsResponse, form, newsError])

  return (
    <>
      <Title className="mb-4" level={2}>Add a News</Title>
      <div className="d-flex justify-content-center">
        <Card bordered className="w-50">
          <Form
            layout="horizontal"
            name="addnews"
            onFinish={onFinish}
            size='large'
            form={form}
          >
            <Form.Item
              className="mb-3"
              name="title" 
              label="Title" 
              rules={[{ required: true, type: 'string', message: 'Please input a title' }]}
            >
              <Input
                placeholder="Title"
                allowClear
              />
            </Form.Item>

            <Form.Item
              className="mb-3"
              name="url" 
              label="URL" 
              rules={[{ required: true, type: 'url', message: 'Please input a video URL' }]}
            >
              <Input
                placeholder="Video URL"
                allowClear
              />
            </Form.Item>

            <Form.Item
              className="mb-3"
              name="language" 
              label="Language" 
              rules={[{ required: true, type: 'string', message: 'Please input a language' }]}
            >
              <Input
                placeholder="Language"
                allowClear
              />
            </Form.Item>

            <Form.Item
              className="mb-3"
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select 
                placeholder="Select a Category"
                allowClear
              >
                {categories.map(category => (
                  <Option 
                    key={category} 
                    value={category}
                  >
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <div className="d-flex justify-content-center">
                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="w-50"
                  disabled={newsLoading}
                  icon={<SaveOutlined />}
                  loading={newsLoading}
                >
                  Send
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}

export default AddNew
