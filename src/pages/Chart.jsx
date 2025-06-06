import ReactECharts from 'echarts-for-react'
import { Card, Typography } from 'antd'

const { Title } = Typography

const option = {
  title: { text: '示例柱状图' },
  tooltip: {},
  xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: {},
  series: [
    {
      name: '数值',
      type: 'bar',
      data: [5, 20, 36, 10, 10],
    },
  ],
}

const Chart = () => (
  <Card>
    <Title level={3} style={{ textAlign: 'center' }}>示例柱状图</Title>
    <ReactECharts option={option} style={{ height: 400 }} />
  </Card>
)

export default Chart
