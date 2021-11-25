import React, { Component } from 'react'
import { Provider } from 'use-http'
import {
  Routes, 
  Route,
  NavLink,
  useLocation
  // useNavigate
} from 'react-router-dom'

import { 
  Layout,
  Menu
  // Divider,
  // Breadcrumb 
} from 'antd'

import { 
  FileDoneOutlined
} from '@ant-design/icons'

// Local Imports
import { API_DOMAIN } from './config/config';

// Routes
import NewList from './routes/NewList'

const { 
  Header,
  Content, 
  Footer 
} = Layout

// Component
const App = () => {

  // Hooks
  const { pathname } = useLocation()

  // Memos
  const privateRoutes = React.useMemo(() => ([
    {
      path: '/', 
      element: (<NewList />),
      menu: {
        label: 'News',
        icon: (<FileDoneOutlined />)
      }
    }
  ]), [])

  const mainMenuItems = React.useMemo(() => (
    privateRoutes.filter(route => (!!(route.menu)))
  ), [privateRoutes])

  const options = React.useMemo(() => ({
    interceptors: {
      request: async ({ options, url, path, route }) => {
        options.headers.Accept = 'application/json'
        // options.headers['Access-Control-Allow-Origin'] = '*'
        // options.headers['Access-Control-Allow-Credentials'] = 'true'
        // options.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers'
        // options.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT'

        return options
      }
    }
  }), [])

  return (
    <Provider url={API_DOMAIN} options={options}>
      <Layout className="layout d-flex">
        <Header className="header">
          <div className="logo-wrapper">
            <div className="logo" />
          </div>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            className="navigation-menu"
            selectedKeys={[pathname]}
          >
            {mainMenuItems.map((option) => (
              <Menu.Item 
                key={option.path} 
                icon={option.menu.icon}
              >
                <NavLink to={option.path}>{option.menu.label}</NavLink>
              </Menu.Item>
            ))}
          </Menu>
          {/* <Menu 
            theme="dark" 
            mode="horizontal" 
            className="login-menu"
            selectedKeys={[pathname]}
          >
            {loginMenu.map((option) => (
              <Menu.Item 
                key={option.path} 
                icon={option.icon}
                disabled
              >
                <NavLink to={option.path}>{option.label}</NavLink>
              </Menu.Item>
            ))}
          </Menu> */}
        </Header>

        <Content className="pt-4 ps-4 pe-4" style={{ overflowY: 'auto' }}>
          <Routes>
            {privateRoutes.map(route => (
              <Route
                key={route.path} 
                path={route.path} 
                element={route.element}
              />
            ))}
          </Routes>
        </Content>

        <Footer className="footer text-center">News Website ©2022 Created by Frank & David</Footer>
      </Layout> 
    </Provider>
  )
}

export default App
