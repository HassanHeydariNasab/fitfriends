export function formattedDistance(distance: number) {
	if (distance >= 1) {
		return farsifiedNumbers(distance.toFixed(1) + ' کیلومتر');
	} else {
		return farsifiedNumbers((distance * 1000).toFixed(0) + ' متر');
	}
}

export function farsifiedNumbers(s: string) {
	return s
		.replaceAll('0', '۰')
		.replaceAll('1', '۱')
		.replaceAll('2', '۲')
		.replaceAll('3', '۳')
		.replaceAll('4', '۴')
		.replaceAll('5', '۵')
		.replaceAll('6', '۶')
		.replaceAll('7', '۷')
		.replaceAll('8', '۸')
		.replaceAll('9', '۹');
}
