export const setOptions = roles => {
	const newArray = [];
	roles.forEach(role => {
		newArray.push({
			value: role.roleName,
			label: setRoleName(role.roleName),
		});
	});
	return newArray;
};

export const setRoleName = roleName => {
	return roleName
		?.split('_')
		.join(' ')
		.replace(/(?:^|\s)\S/g, chain => {
			return chain.toUpperCase();
		});
};
