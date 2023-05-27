//https://api.open-meteo.com/v1/forecast?latitude=52&longitude=13&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles

const weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=52&longitude=13&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles'

//const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getWeather = async (lat: number, lon: number, timezone: string) => {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&timezone=${timezone}`);
    const data = await res.json();
    return data
}

export { getWeather }

//getWeather(10, 10, currentTimezone)