import React from 'react'

interface HourlyModel {
    hour: string;
    icon: number;
    precip: number;
    temp: number;
    timestamp: number;
  }

interface HourlyWeatherProps {
    hourlyWeather: HourlyModel[]
}
const HourlyWeather: React.FC<HourlyWeatherProps> = ({ hourlyWeather }) => {
  return (
    <div className='w-100 h-48 bg-gray-500'>
        {hourlyWeather.map((row: any) => (
            <div className='text-white'>
                <p>{row.hour}</p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        ))}
    </div>
  )
}

export default HourlyWeather