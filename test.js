function test(name, x, is, log) {
	let lastTest = window.lastTest || name.split('/')[0];
	if (typeof x === 'function') x = x();
	if (typeof is === 'function') is = is();
	let pass = 'fail';
	if (Array.isArray(x) && Array.isArray(is)) {
		pass = equal(x, is) ? 'pass' : 'fail';
	} else {
		pass = x === is ? 'pass' : 'fail';
	}
	let color = pass === 'pass' ? 'green' : 'red';
	let newTest = lastTest !== name.split('/')[0] ? '\n' : '';
	window.lastTest = name.split('/')[0];
	console.log(`${newTest}%c(${pass})%c TEST: %c"${name.replace('/', ' / ')}"`, `color: ${color}; font-weight: 900` , 'color: blue; font-weight: 900', 'font-weight: 900', '');
	if (log) {
		console.log('%o', x);
		console.log('%o', is);
	}
}

function equal(arr1, arr2) {
	let eq = true;
	for (let i = 0; i < (arr1.length || arr2.length); i++) {
		if (arr1[i] !== arr2[i]) eq = false;
	}
	return eq;
}