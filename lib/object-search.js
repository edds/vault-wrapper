const getKeysByValue = (object, value) => Object.keys(object).filter(key => `${object[key]}`.includes(value));

function flattenObject(object, current) {
	return Object.keys(object).reduce((memo, key) => {
		var newKey = (current ? current + "." + key : key);
		if(object[key] && typeof object[key] === "object") {
			const flattened = flattenObject(object[key], newKey);
			Object.keys(flattened).forEach(key => memo[key] = flattened[key]);
		} else {
			memo[newKey] = object[key];
		}
		return memo;
	}, {});
}

const filterObjectSearchingValues = (object, value) => {
	const flattened = flattenObject(object);

	const matchingKeys = getKeysByValue(flattened, value)

	return matchingKeys.reduce((memo, key) => {
		memo[key] = flattened[key];
		return memo;
	}, {});
};

module.exports = {
	filterObjectSearchingValues,
};
