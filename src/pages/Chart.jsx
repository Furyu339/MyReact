import ReactECharts from 'echarts-for-react'

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

const Chart = () => <ReactECharts option={option} style={{ height: 400 }} />

export default Chart
