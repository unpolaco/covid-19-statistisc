const allCases = [
		'confirmed',
		'newConfirmed',
		'deaths',
		'newDeaths',
		'recovered',
		'newRecovered',
	];
	const totalCases = [
		'confirmed',
		'deaths',
		'recovered',
	]
	const allCasesLabels = [
		{ name: 'cumulative', style: 'label_cumulative' },
		{ name: 'new cases', style: 'label_new_cases' },
		{ name: 'confirmed', style: 'label_confirmed' },
		{ name: 'deaths', style: 'label_deaths' },
		{ name: 'recovered', style: 'label_recovered' },
	];
	const totalCasesLabels = [
		{ name: 'confirmed', style: 'total_label_confirmed'},
		{ name: 'deaths', style: 'total_label_deaths'},
		{ name: 'recovered', style: 'total_label_recovered'},
	];
  export {allCases, totalCases, allCasesLabels, totalCasesLabels};
