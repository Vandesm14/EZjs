let lastTest;
let testGroup = [];
let failedTests = [];
let expanded = 0; // 0: total, 1: groups, 2: all

let total = 0;

function verbose(level) {
	expanded = level;
}

function test(name, x, is) {
	if (!lastTest) lastTest = name.split('/')[0];
	if (arguments.length === 2) is = true;
	if (typeof x === 'function') x = x();
	if (typeof is === 'function') is = is();
	let pass = 'fail';
	if (Array.isArray(x) && Array.isArray(is)) {
		pass = equal(x, is) ? 'pass' : 'fail';
	} else {
		pass = x === is ? 'pass' : 'fail';
	}
	let color = pass === 'pass' ? 'green' : 'red';
	let newTest = lastTest !== name.split('/')[0];
	if (newTest && expanded > 0) group();
	if (pass !== 'pass') failedTests.push(name);
	total++;
	lastTest = name.split('/')[0];
	testGroup.push(pass === 'pass');
	if (expanded === 2) console.log(`${newTest ? '\n' : ''}%c(${pass})%c TEST: %c"${name.replace('/', ' / ')}"`, `color: ${color}; font-weight: 900`, 'color: blue; font-weight: 900', 'font-weight: 900');
	return {
		x,
		is,
		log: function (log) {
			if (log) {
				console.log(log)
			} else {
				console.log('x:%o', this.x);
				console.log('is:%o', this.is);
			}
		}
	};
}

function group() {
	let good = testGroup.filter(el => el).length;
	let total = testGroup.length;
	let score = good / total;
	let pass = score === 1;
	testGroup = [];
	console.log(`%c(${pass ? 'pass' : 'fail'})%c GROUP (${good} / ${total}): %c"${lastTest}"`, `color: ${pass ? 'green' : 'red'}; font-weight: 900`, 'color: orange; font-weight: 900', 'font-weight: 900');
}

function done() {
	if (expanded > 0) group();
	if (failedTests.length === 0) {
		console.log(`${expanded > 0 ? '\n' : ''}%cNo failed tests.`, 'color: green; text-decoration: underline');
	} else {
		console.log(`${expanded > 0 ? '\n' : ''}%c${failedTests.length} failed tests:`, 'color: red; text-decoration: underline');
		let grp = failedTests[0].split('/')[0];
			for (let i in failedTests) {
				let newGroup = grp !== failedTests[i].split('/')[0];
				if (newGroup) grp = failedTests[i].split('/')[0];
				console.log(`%c(fail)%c TEST: %c"${failedTests[i]}"`, `color: red; font-weight: 900`, 'color: blue; font-weight: 900', 'font-weight: 900');
			}
	}
}

function equal(arr1, arr2) {
	let eq = true;
	for (let i = 0; i < (arr1.length || arr2.length); i++) {
		if (arr1[i] !== arr2[i]) eq = false;
	}
	return eq;
}