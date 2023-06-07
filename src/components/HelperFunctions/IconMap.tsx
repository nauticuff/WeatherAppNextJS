const ICON_MAP = new Map();

const addMapping = (values: number[], icon: string) => {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}
addMapping([0, 1], "clear")
addMapping([2, 3], "cloudy")
addMapping([45, 48], "fog")
addMapping([51, 53, 55, 56, 57], "drizzle")
addMapping([61, 63, 65, 66, 67, 80, 81, 82], "rain")
addMapping([71, 73, 75, 77, 85, 86], "snow")
addMapping([95, 96, 99], "thunder")

const getIconUrl = (iconCode: number) => {
    return `../../../${ICON_MAP.get(iconCode)}.svg`
}

export { ICON_MAP, getIconUrl };
