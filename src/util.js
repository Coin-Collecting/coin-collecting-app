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

export const denominationName = val => {
  switch (val) {
    case '0.005':
      return "Half Cent";
    case '0.01':
      return "1 Cent";
    case '0.02':
      return "2 Cent Piece";
    case '0.03':
      return "3 Cent Piece";
    case '0.05':
      return "Nickel";
    case '0.1':
      return "Dime";
    case '0.25':
      return "Quarter";
    case '0.50':
      return "Half Dollar";
    case '1.00':
      return "Dollar";
		default:
			return val;
  }
}
