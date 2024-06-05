document.addEventListener("DOMContentLoaded", () => {
	console.log("22", window.__playinfo__);
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const translate = document.getElementById("translate");

		chrome.storage.sync.get("translate", function (items) {
			const data = items["translate"]; // Retrieve stored data
			console.log("translate red sync storage:", data);
			translate.checked = !!data;
			chrome.tabs.sendMessage(tabs[0].id, { message: "translate", value: !!data });
		});

		// 添加点击事件处理程序
		translate.addEventListener("click", (e) => {
			const checked = e.target.checked;
			// 在按钮点击时执行的代码

			chrome.storage.sync.set({ translate: checked });
			chrome.tabs.sendMessage(tabs[0].id, { message: "translate", value: e.target.checked });
		});
	});
});
