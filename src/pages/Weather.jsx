import { useEffect, useState } from 'react'
import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.12&current_weather=true'
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div>获取天气信息失败: {error}</div>
  if (!weather) return <div>加载中...</div>

  return (
    <Card style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        伦敦当前天气
      </Title>
      <Paragraph>温度: {weather.temperature}&deg;C</Paragraph>
      <Paragraph>风速: {weather.windspeed}km/h</Paragraph>
    </Card>
  )
}

export default Weather
