const Recipe = require('./model');

function loadPresetDate() {
	const steak = new Recipe({
		title: 'Steak',
		ingredients: ['Top Sirloin Steak', 'Butter', 'Aromatics'],
		steps: [
			'Pat dry',
			'Season generously',
			'Preheat the pan',
			'Sear steaks',
			'Add butter and aromatics',
			'Remove steak',
		],
		completionTime: 20,
		creator: 'user1',
	});
	const milkshake = new Recipe({
		title: 'Milk Shake',
		ingredients: [
			'4 large scoops (about 1 1/2 c.) vanilla ice cream',
			'1/4 c. milk',
			'Whipped topping',
			'Sprinkles',
			'Maraschino cherry',
		],
		steps: [
			'blend together ice cream and milk',
			'Pour into a glass and garnish with whipped topping sprinkles and a cherry',
		],
		completionTime: 10,
		creator: 'user2',
	});

	steak.save();
	milkshake.save();
}

module.exports = loadPresetDate;
