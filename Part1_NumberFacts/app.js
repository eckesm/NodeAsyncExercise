// Exercise 1

async function getSingleNumberFact(number) {
	const res = await axios.get(`http://numbersapi.com/${number}?json`);
	try {
		console.log(res.data.text);
	} catch (e) {
		console.log('ERROR!', e);
	}
}

getSingleNumberFact(13);

// ----------------------------------------------
// Exercise 2

async function getMultipleNumberFacts(numbersArr) {
	const res = await axios.get(`http://numbersapi.com/${numbersArr}?json`);
	try {
		listNumbersFacts(res.data);
	} catch (e) {
		console.log('ERROR!', e);
	}
}

function listNumbersFacts(numbersFactsObj) {
	const ul = document.getElementById('exercise2');
	for (let number in numbersFactsObj) {
		const li = document.createElement('li');
		li.innerText = numbersFactsObj[number];
		ul.append(li);
	}
}

getMultipleNumberFacts([ 3, 5, 7, 9, 11, 13 ]);

// ----------------------------------------------
// Exercise 3

async function getFactsAboutNumber(number, numFacts) {
	let numberRequests = [];
	for (let i = 1; i <= numFacts; i++) {
		numberRequests.push(axios.get(`http://numbersapi.com/${number}?json`));
	}
	const res = await Promise.all(numberRequests);
	try {
		listSingleNumberFacts(res);
	} catch (e) {
		console.log('ERROR!', e);
	}
}

function listSingleNumberFacts(factsArr) {
	const ul = document.getElementById('exercise3');
	for (let fact of factsArr) {
		const li = document.createElement('li');
		li.innerText = fact.data.text;
		ul.append(li);
	}
}

getFactsAboutNumber(13, 4);
