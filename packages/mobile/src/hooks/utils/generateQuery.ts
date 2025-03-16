export const generateQuery = (query: object) => {
	const queriesArray = [];
	for (const [key, value] of Object.entries(query)) {
		if (value) {
			queriesArray.push(`${key}=${value}`);
		}
	}
	return queriesArray.join('&');
};
