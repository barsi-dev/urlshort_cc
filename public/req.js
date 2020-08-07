function testFunc() {
	let after = document.querySelector('#after');
	after.innerHTML = 'test';
}

function getReq() {
	let long = document.querySelector('#long');
	let slug = document.querySelector('#slug');
	let afterPara = document.querySelector('#afterPara');

	if (/[^a-z^0-9]/gi.test(slug.value)) {
		return (afterPara.innerHTML = 'Slug can only have letters and numbers...');
	} else {
	}

	const Http = new XMLHttpRequest();
	const url = 'https://barsi.me/api/url/shorten';
	Http.open('POST', url, true);
	Http.setRequestHeader('Content-type', 'application/json');
	let toSend = `{ "longUrl": "${long.value}", "slug": "${slug.value}" }`;
	Http.send(toSend);

	Http.onreadystatechange = async function () {
		if (this.readyState == 4 && this.status == 200) {
			let myObj = await JSON.parse(this.responseText);
			console.log(myObj);

			if (myObj.res) {
				afterPara.innerHTML = myObj.res;
			} else {
				afterPara.innerHTML = myObj.shortUrl;
			}
		} else if (this.status == 429) {
			afterPara.innerHTML =
				'You have been rate limited... Try again in a few mins...';
		}
	};
}
