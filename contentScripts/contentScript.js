// 提取字符串中的网址
function httpString(s) {
	//var reg = /(https:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
	var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
	s = s.match(reg);
	return s;
}

window.onload = function () {
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

	// 自动跳转
	const bodyText = document.body.innerText;
	const text = bodyText.match(/[\u4e00-\u9fa5]/g);
	const urls = httpString(bodyText);
	if (text&&text.length < 100 && urls && urls.length == 1 && bodyText.includes("安全")) {
		window.close();
		window.open(urls[0]);
	}

	// 移除页面灵车灰
	// document.getElementsByTagName("html")[0].style.filter = "unset";
	// 隐藏广告
	if (location.host == "www.weather.com.cn") {
		document.getElementsByClassName("_aum7a5ei40o")[0].style.display = "none"
		document.getElementsByClassName("topad_bg")[0].style.display = "none"
	}

	
};
