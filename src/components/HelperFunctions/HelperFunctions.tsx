const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
});
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
});

const parseCurrentWeather = (
  weatherData: any,
  geoData: any = null,
  initialLocation: any = null
) => {
  const { temperature: currentTemp } = weatherData.current_weather;

  const {
    temperature_2m_max: [highTemp],
    temperature_2m_min: [lowTemp],
  } = weatherData.daily;

  if (geoData === null) {
    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(highTemp),
      lowTemp: Math.round(lowTemp),
      lat: weatherData.latitude,
      lon: weatherData.longitude,
      icon: weatherData.current_weather.weathercode,
      name: initialLocation,
    };
  }

  const nearestLocation =
    geoData.results[0].components.city ||
    geoData.results[0].components.town ||
    geoData.results[0].components.county ||
    geoData.results[0].components.district ||
    geoData.results[0].components.state ||
    geoData.results[0].components.country;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    lat: geoData.results[0].geometry.lat,
    lon: geoData.results[0].geometry.lng,
    icon: weatherData.current_weather.weathercode,
    name: nearestLocation,
  };
};

const parseHourlyWeather = ({ daily, hourly, current_weather }: any) => {
  return hourly.time
    .map((time: number, index: number) => {
      return {
        idx: index,
        timestamp: time * 1000,
        hour: HOUR_FORMATTER.format(time * 1000),
        temp: Math.round(hourly.temperature_2m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
        icon: hourly.weathercode[index],
        sunrise: HOUR_FORMATTER.format(daily.sunrise[0] * 1000),
        sunset: HOUR_FORMATTER.format(daily.sunset[0] * 1000),
      };
    })
    .filter(
      ({ timestamp, idx }: any) =>
        timestamp >= current_weather.time * 1000 && idx <= 36
    );
};

const parseDailyWeather = ({ daily }: any) => {
  return daily.time.map((dayUnix: number, index: number) => {
    return {
      day: DAY_FORMATTER.format(dayUnix * 1000),
      icon: daily.weathercode[index],
      high: Math.round(daily.temperature_2m_max[index]),
      low: Math.round(daily.temperature_2m_min[index]),
      precip: Math.round(daily.precipitation_probability_max[index]),
    };
  });
};

export { parseCurrentWeather, parseHourlyWeather, parseDailyWeather };
