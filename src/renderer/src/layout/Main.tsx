import { Layout, Menu } from 'antd'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function MainLayout(): React.ReactElement {
  const [activeKey, setActiveKey] = useState('1')
  const items = [
    {
      key: '1',
      label: <Link to="/">主页</Link>
    },
    {
      key: '3',
      label: <Link to="/settings">代理</Link>
    },
    {
      key: '2',
      label: <Link to="/exports">防火墙</Link>
    },
    {
      key: '2-1',
      label: <Link to="/exports-list">防火墙全部列表</Link>
    }
  ]

  const handleMenuSelect = (ev: any): void => {
    setActiveKey(ev)
  }

  return (
    <Layout style={{ backgroundColor: '#fff', height: '100vh', width: '100vw' }}>
      <Header>
        <Menu
          activeKey={activeKey}
          onSelect={handleMenuSelect}
          theme="dark"
          mode="horizontal"
          items={items}
        />
      </Header>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>

      <Footer style={{ textAlign: 'center' }}>
        <div
          onClick={() => {
            window.api.openDefaultBrowser('https://github.com/yyong008')
          }}
          style={{ cursor: 'pointer'}}
        >
          GitHub
        </div>
        <div>WinNetshDesktop ©2023 Created by Magneisum</div>
      </Footer>
    </Layout>
  )
}
