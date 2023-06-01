import React from 'react'
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface DailyModel {
    day: string,
    icon: number,
    high: number,
    low: number,
    precip: number
}

interface DailyWeatherProps {
    dailyWeather: DailyModel[]
}

const DailyWeather: React.FC<DailyWeatherProps> = ({dailyWeather}) => {
    return (
        <div className='future bg-[#386894] px-6 rounded-lg'>
            <div className='future-subhead flex items-center gap-8 text-gray-300 font-light text-sm py-4'>
                <p>ICON</p>
                <p className='sm'>5-Day Forecast</p>
            </div>
            <div className='daily-container text-white'>
                {dailyWeather.map((day: DailyModel, index: any) => (
                    <div key={day.day}>
                        <hr></hr>
                        <div className='daily-row grid grid-cols-4 py-4 gap-2 font-light items-center'>
                            <p>{index === 0 ? 'Today' : day.day}</p>
                            <p>{day.icon}</p>
                            <p className='text-sm'><span className='text-lg font-normal'>{day.high}&deg;</span>/{day.low}&deg;</p>
                            {/* <p>{day.low}</p> */}
                            <p><WaterDropIcon className='mr-1'/>{day.precip}%</p>
                            {/* <p><img src={`https://openweathermap.org/img/wn/${forecastInfo[1][index]}.png`}></img> {forecastInfo[2][index]}&deg;/{forecastInfo[3][index]}&deg;</p>
                                <p>{forecastInfo[4][index]}</p>
                                <p><svg className='mx-2' width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7764 4.67873C14.3223 2.99974 12.686 1.48762 10.8978 0.170259C10.7395 0.0594419 10.551 0 10.3578 0C10.1646 0 9.97602 0.0594419 9.81776 0.170259C8.02949 1.48762 6.39324 2.99974 4.93917 4.67873C1.70794 8.39462 0 12.3121 0 16.0075C0 18.7545 1.09126 21.3891 3.03372 23.3315C4.97617 25.274 7.61071 26.3652 10.3578 26.3652C13.1048 26.3652 15.7393 25.274 17.6818 23.3315C19.6243 21.3891 20.7155 18.7545 20.7155 16.0075C20.7155 12.3121 19.0076 8.39462 15.7764 4.67873ZM10.3578 24.482C8.11095 24.4795 5.95689 23.5858 4.36816 21.9971C2.77942 20.4083 1.88576 18.2543 1.88323 16.0075C1.88323 9.27106 8.41206 3.64706 10.3578 2.12108C12.3037 3.64729 18.8323 9.27106 18.8323 16.0075C18.8298 18.2543 17.9361 20.4083 16.3474 21.9971C14.7586 23.5858 12.6046 24.4795 10.3578 24.482ZM16.9491 16.0075C16.9471 17.755 16.252 19.4304 15.0163 20.666C13.7806 21.9017 12.1053 22.5968 10.3578 22.5988C10.108 22.5988 9.86852 22.4996 9.69194 22.323C9.51535 22.1464 9.41614 21.9069 9.41614 21.6572C9.41614 21.4074 9.51535 21.1679 9.69194 20.9913C9.86852 20.8148 10.108 20.7155 10.3578 20.7155C11.606 20.7141 12.8027 20.2177 13.6853 19.335C14.5679 18.4524 15.0644 17.2557 15.0658 16.0075C15.0658 15.7577 15.165 15.5182 15.3416 15.3417C15.5182 15.1651 15.7577 15.0659 16.0074 15.0659C16.2572 15.0659 16.4967 15.1651 16.6733 15.3417C16.8499 15.5182 16.9491 15.7577 16.9491 16.0075Z" fill="white"/></svg> {forecastInfo[5][index]}%</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DailyWeather;