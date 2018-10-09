export const capitalize = (str) => {
	if (!str || !str[0]) return str
	return str[0].toUpperCase() + str.slice(1, str.length)
}