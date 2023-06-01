// const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`

//const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getWeather = async (lat: number, lon: number, timezone: string) => {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`);
    const data = await res.json();
    return data
}

const getLocation = async (lat: number, lon: number, apiKey: string) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat},${lon}&no_annotations=1&components=city,town,village`)
    const data = await res.json();
    return data
}

export { getWeather, getLocation }

//getWeather(10, 10, currentTimezone)