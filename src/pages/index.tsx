import { useState } from 'react';
import Nav from '@/components/nav';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastWeather from '@/components/ForecastWeather';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/theme';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState({
    current: {
      description: 'Sunny',
      icon: '04d',
      currentTemp: 75,
      today: 'Mon',
      highTemp: 90,
      lowTemp: 55,
      name: 'Stockton',
      sunsetTime: 1679537879,
      lat: 10,
      lon: 20
    }
  })

  const [forecastWeather, setForecastWeather] = useState({
    forecast: [
      { day: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      { icon: ['01d', '02d', '03d', '09d', '01d', '13d'] },
      { high: [65, 62, 70, 59, 60, 63] },
      { low: [57, 55, 45, 49, 50, 52] },
      { description: ['Sunny', 'Overcast', 'Cloudy', 'Rainy', 'Sunny', 'Snow'] },
      { precipitation: [0, 4, 25, 62, 2, 40] }
    ]
  })

  return (
    <ThemeProvider theme={theme}>
      <div className='h-screen bg-[linear-gradient(#2c97df,#a2b3c4)] py-8 px-6'>
        <div className='max-w-6xl mx-auto'>
          <Nav setCurrentWeather={setCurrentWeather} setForecastWeather={setForecastWeather} />
          <div className='flex flex-col'>
            <CurrentWeather currentWeather={currentWeather} />
            <ForecastWeather forecastWeather={forecastWeather} />
          </div>

        </div>
      </div>
    </ThemeProvider>
  )
}
