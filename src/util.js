export function getCompositionString(composition) {
	const {
		brass,
		copper,
		gold,
		nickel,
		silver,
		steel,
		tin,
		zinc,
	} = composition;
	let compString = '';

	Object.keys(composition).forEach(key => {
		if (composition[key] && key !== 'id' && key !== '__typename') {
			compString += `${Math.floor(composition[key] * 100)}% ${key} `
		}
	});

	return compString;
}

export const abbreviateMint = mint => {
	switch (mint) {
    case 'Philadelphia':
      return "P";
    case 'Denver':
      return "D";
    case 'San Francisco':
      return "S";
		default:
			return mint;
	}
}

export const issueIds = [
	{
		slug: 'half-cent',
		name: 'Half Cent',
		issueIds: [1, 2, 3, 4, 5]
	}
];