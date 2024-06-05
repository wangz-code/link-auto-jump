function readMsg(sendResponse, data) {
	const url = `http://pic.djgo.cc/api/ra?text=${data}`;
	const options = { timeout: 10 * 1000 };

	fetch(url, options)
		.then(function (response) {
			return response.arrayBuffer();
		})
		.then(function (arrayBuffer) {
			const uint8Array = new Uint8Array(arrayBuffer);
			sendResponse({ data: uint8Array, binary: true, origin: data });
		})
		.catch(function (error) {
			console.error("Fetch error:", error);
		});
}

function handleMessage(request, sender, sendResponse) {
	const { type, data } = request;
	if (type === "hello") {
		readMsg(sendResponse, data);
		return true;
	}
	if (type === "translate") {
		const url = `http://pic.djgo.cc/translate?text=${data}`;
		const options = { timeout: 10 * 1000 };
		fetch(url, options)
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				console.log("翻译后 log==>", response.translated_text);
				readMsg(sendResponse, response.translated_text);
			})
			.catch(function (error) {
				console.error("Fetch error:", error);
			});
		return true;
	}
}
chrome.runtime.onMessage.addListener(handleMessage);
