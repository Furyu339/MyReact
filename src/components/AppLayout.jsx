import { Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Header, Content } = Layout

const items = [
  { label: <Link to="/">首页</Link>, key: '/' },
  { label: <Link to="/counter">计数器</Link>, key: '/counter' },
  { label: <Link to="/chart">图表</Link>, key: '/chart' },
  { label: <Link to="/weather">天气</Link>, key: '/weather' },
]

const AppLayout = () => {
  const location = useLocation()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AppLayout
