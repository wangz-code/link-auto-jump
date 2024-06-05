// 提取字符串中的网址
function httpString(s) {
	//var reg = /(https:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
	var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
	s = s.match(reg);
	return s;
}

function classNone(cls) {
	var dom = document.getElementsByClassName(cls);
	if (dom.length == 0) {
		return;
	} else {
		for (let i = 0; i < dom.length; i++) {
			if (dom[i] && dom[i].style) {
				dom[i].style.display = "none";
			}
		}
	}
}
// 是否是中文
function isChinese(str) {
	// 判断是否包含中文字符的正则表达式
	var chineseRegEx = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
	return chineseRegEx.test(str);
}

// 清理定时器
const cleanTime = () => {
	let endTid = setTimeout(function () {});
	for (let i = 0; i <= endTid; i++) {
		clearTimeout(i);
		clearInterval(i);
	}
};

function getTabId() {}
window.addEventListener("mousemove", function () {
	if (location.host == "www.haitu.tv") {
		classNone("player-info");
	}
});
window.addEventListener("load", function () {
	// angular 自动重定向到中文文档
	if (location.host == "angular.io") {
		location.href = location.href.replaceAll(".io", ".cn");
	}

	// antvue 自动重定向到中文文档
	if (location.host == "antdv.com") {
		if (!location.href.includes("overview-cn")) {
			location.href = location.href.replaceAll("overview", "overview-cn");
		}
	}

	// 点击链接,自动跳转
	const bodyText = document.body.innerText;
	const text = bodyText.match(/[\u4e00-\u9fa5]/g);
	const urls = httpString(bodyText);
	if (text && text.length < 100 && urls && urls.length == 1 && bodyText.includes("安全")) {
		window.close();
		window.open(urls[0]);
	}

	// 移除页面灵车灰
	// document.getElementsByTagName("html")[0].style.filter = "unset";
	// 隐藏广告
	if (location.host == "www.weather.com.cn") {
		classNone("_aum7a5ei40o");
		classNone("topad_bg");
	}
	// 一言
	if (location.host == "yiyan.baidu.com") cleanTime();
	if (location.host == "qianwen.aliyun.com") cleanTime();

	// NuNu
	if (location.host.includes("nunuyy5")) cleanTime();
	// 隐藏知乎广告

	// 隐藏知乎图片
	if (location.host.includes("zhihu.com")) {
		window.addEventListener("scroll", () => {
			classNone("Question-sideColumn");
			classNone("Pc-card Card");
			classNone("Banner-adsense");
		});
	}
	// 隐藏弹窗
	if (location.host.includes("chatbot.theb.ai")) {
		const modal = document.querySelector(".shadow-smt-app-exit_preventor");
		if (modal) modal.style = "display:none";
	}

	// JSON数据格式化
	const el = document.querySelector("body > pre");
	if (el instanceof HTMLElement) {
		try {
			function syntaxHighlight(json) {
				const setLabel = (value) => `#${typeof value}${value}</span>`;
				const setColor = (color) => `<span style="color: ${color};">`;

				const startObject = (value) => {
					for (const key in value) {
						value[key] = processRecord(value[key]);
					}
					return value;
				};
				const processRecord = (record) => {
					if (typeof record === "object") return startObject(record);
					if (Array.isArray(record)) return record.map((value) => processRecord(value));
					return setLabel(record);
				};
				startObject(json);
				let newVal = JSON.stringify(json, null, 3);
				newVal = newVal.replace(/#string/g, setColor("#42b983")).replace(/#number/g, setColor("#fc1e70"));
				return newVal;
			}
			const j = JSON.parse(el.innerText); // check if it's valid JSON
			const status = j.status;
			el.style.fontFamily = "Consolas, Menlo, Courier, monospace";
			el.innerHTML = syntaxHighlight(j);
			const h4 = document.createElement("h4");
			h4.innerText = JSON.stringify({ status });
			el.parentNode.insertBefore(h4, el);
		} catch (err) {
			console.error("JSON_VIEW:", err);
		}
	}

	// bilibili 字幕
	// BILI down
	// if (location.host == "www.bilibili.com" && location.pathname.includes("video")) {
	// 	getBVideo();
	// 	window.addEventListener("mousemove", getBVideo);
	// }
});

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// let selectionText = "";
// let read = null;
// let reading = false;

// // 朗读
// const readMe = () => {
// 	// if (reading) return;
// 	reading = true;
// 	chrome.runtime.sendMessage({ type: "hello", data: selectionText }, function (response) {
// 		console.log(response);
// 		if (response.binary) {
// 			const uint8Array = Uint8Array.from(Object.values(response.data));
// 			const audioContext = new AudioContext();
// 			audioContext.decodeAudioData(uint8Array.buffer, function (decodedData) {
// 				const source = audioContext.createBufferSource();
// 				source.buffer = decodedData;
// 				source.connect(audioContext.destination);
// 				source.start();
// 				source.addEventListener("ended", () => {
// 					reading = false;
// 				});
// 			});
// 		}
// 	});
// };

// // 提取选择文本
// const extractSelectionText = function (event) {
// 	const selection = window.getSelection();
// 	if (selection == selectionText) return;
// 	if (selection.toString().trim().length == 0) return;
// 	selectionText = selection.toString();

// 	const mouseX = event.pageX;
// 	const mouseY = event.pageY;

// 	let chooseRead = document.getElementById("read");
// 	if (chooseRead) chooseRead.parentNode.removeChild(chooseRead);
// 	read = document.createElement("button");
// 	read.id = "read";
// 	read.style.cssText = `width:28px;height:28px;position:absolute;left:${mouseX}px;top:${mouseY}px;cursor:point;user-select:none;z-index:9999;background-image:url(https://djgo.cc/static/imgs/read.png);background-size:cover;`;
// 	read.onclick = readMe;
// 	document.body.appendChild(read);
// };

// // 监听网页选择
// document.addEventListener("mouseup", function (event) {
// 	extractSelectionText(event);
// });

// document.addEventListener("touchend", function (event) {
// 	extractSelectionText(event);
// });

// let mContext = null;
// function audioText(uint8Array) {
// 	if (mContext == null) mContext = new AudioContext();
// 	mContext.decodeAudioData(uint8Array.buffer, function (decodedData) {
// 		const source = mContext.createBufferSource();
// 		source.buffer = decodedData;
// 		source.connect(mContext.destination);
// 		source.start();
// 	});
// }

// const translateText = {
// 	targetNode: null,
// 	observer: null,
// 	init: function (isBegin) {
// 		if (this.targetNode) return;
// 		const textMap = new Map();
// 		this.targetNode = document.getElementsByClassName("bpx-player-subtitle-panel-wrap")[0];
// 		this.observer = new MutationObserver((mutationsList, observer) => {
// 			if (mutationsList && mutationsList.length) {
// 				for (const item of mutationsList) {
// 					const innerText = item.target.innerText;
// 					if (innerText.length && innerText != "字幕样式测试") {
// 						textMap.set(innerText, 0);
// 					}
// 				}
// 				if (textMap.size) {
// 					let readText = Array.from(textMap.keys()).join(",");
// 					if (!isChinese(readText)) {
// 						console.log("朗读！", readText);
// 						chrome.runtime.sendMessage({ type: "translate", data: readText }, function (response) {
// 							console.log("响应", response.origin);
// 							if (response.binary) {
// 								const uint8Array = Uint8Array.from(Object.values(response.data));
// 								audioText(uint8Array);
// 							}
// 						});
// 					}
// 				}
// 				textMap.clear();
// 			}
// 		});

// 		setTimeout(() => {
// 			if (!this.targetNode) this.targetNode = document.getElementsByClassName("bpx-player-subtitle-panel-wrap")[0];
// 			console.log("this.targetNode log==>", this.targetNode);
// 			isBegin && this.begin();
// 		}, 5000);
// 	},
// 	begin: function () {
// 		if (this.observer) {
// 			this.observer.disconnect();
// 			this.observer.observe(this.targetNode, { childList: true, subtree: true });
// 		}
// 	},
// 	end: function () {
// 		this.observer && this.observer.disconnect();
// 	},
// };

// let observer = null;
// let targetNode = null;
// 朗读英文翻译为中文字幕后朗读
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	if (request.message === "translate") {
// 		console.log("request.value log==>", request.value);

// 		translateText.init();
// 		if (request.value) {
// 			translateText.begin();
// 		} else {
// 			translateText.end();
// 		}
// 	}
// });

// // 创建一个 MutationObserver 实例

// var currHref = "";
// function getBVideo() {
// 	if (location.href == currHref) {
// 		return;
// 	}

// 	currHref = location.href;
// 	fetch(location.href)
// 		.then((res) => {
// 			return res.text();
// 		})
// 		.then((res) => {
// 			var start = "window.__playinfo__=";
// 			const begin = res.indexOf(start);
// 			const end = res.indexOf("</script><script>window.__INITIAL_STATE__=");
// 			console.log(begin);
// 			console.log(end);
// 			var str = res.substring(begin + start.length, end);

// 			var json = JSON.parse(str);
// 			var dash = json.data.dash;
// 			var video = dash.video.find((item) => {
// 				return item.codecid == json.data.video_codecid;
// 			});
// 			var audio = dash.audio[0].baseUrl;
// 			newDiv = document.getElementById("openvideo");
// 			txDiv = document.getElementById("txvideo");

// 			var uid = location.pathname.substring(7, location.pathname.length - 1);
// 			var url = `http://wz.djgo.cc:8990/down?video=${encodeURIComponent(video.baseUrl)}&audio=${encodeURIComponent(audio)}&uid=${uid}`;
// 			if (newDiv == null) {
// 				newDiv = document.createElement("div");
// 				txDiv = document.createElement("div");
// 				txDiv.id = "txvideo";
// 				txDiv.innerHTML = "腾讯云";

// 				newDiv.id = "openvideo";
// 				newDiv.innerHTML = "树莓派";
// 				function css(top) {
// 					return `
// 					position: fixed;
// 					left: 0;
// 					top: ${top}%;
// 					transform: translateY(-50%);
// 					padding: 10px 20px;
// 					background-color: #333;
// 					color: #fff;
// 					border: none;
// 					cursor: pointer;
// 					z-index: 9999;
// 					cursor: pointer;
// 			`;
// 				}
// 				newDiv.style = css(50);
// 				txDiv.style = css(40);

// 				document.body.appendChild(newDiv);
// 				document.body.appendChild(txDiv);
// 			}
// 			newDiv.onclick = function () {
// 				window.open(url, "_blank");
// 			};
// 			txDiv.onclick = function () {
// 				window.open(url.replace("wz.djgo.cc", "djgo.cc"), "_blank");
// 			};
// 		});
// }
