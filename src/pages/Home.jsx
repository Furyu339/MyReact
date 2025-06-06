import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

const Home = () => (
  <Card style={{ maxWidth: 600, margin: '0 auto' }}>
    <Title level={2} style={{ textAlign: 'center' }}>
      欢迎来到示例应用
    </Title>
    <Paragraph style={{ textAlign: 'center' }}>
      使用上方导航浏览不同示例页面。
    </Paragraph>
  </Card>
)

export default Home
