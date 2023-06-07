const DESCRIPTION_MAP = new Map();

const addMapping = (values: number[], icon: string) => {
  values.forEach((value) => {
    DESCRIPTION_MAP.set(value, icon);
  });
};
addMapping([0, 1], "Clear sky");
addMapping([2, 3], "Cloudy");
addMapping([45, 48], "Fog");
addMapping([51, 53, 55, 56, 57], "Drizzle");
addMapping([61, 63, 65, 66, 67, 80, 81, 82], "Rain");
addMapping([71, 73, 75, 77, 85, 86], "Snow");
addMapping([95, 96, 99], "Thunderstorm");

const getWeatherDescription = (iconCode: number) => {
  return DESCRIPTION_MAP.get(iconCode);
};

export { getWeatherDescription };
