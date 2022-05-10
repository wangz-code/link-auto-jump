// 提取字符串中的网址
function httpString(s) {
	//var reg = /(https:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
	var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
	s = s.match(reg);
	return s;
}

// 跳转倒计时
const timeOut = function (button, target) {
	// location.href = decodeURIComponent(target);
	button.innerText = "正在跳转...";
	window.close();
	window.open(decodeURIComponent(target))
};

// 获取页面dom
function q(options = {}) {
	options.c = options.c ? options.c : "getElementsByClassName";
	return document[options.c](options.el)[0];
}
// 网址库
const urlLib = {
	"link.juejin.cn/": {
		el: "btn",
	},
	"link.csdn.net/": {
		el: "loading-btn",
	},
	"link.zhihu.com/": {
		el: "button",
	},
	"developers.weixin.qq.com/community/middlepage/href": {
		el: "text_area_title",
	},
	"gitee.com/link": {
		el: "button",
	},
	"www.oschina.net/action/GoToLink": {
		el: "link-button",
	},
};

const LINKLIB = {
	csdn: "link.csdn.net/",
};

// csdn隐藏登陆弹窗
function hiddenCsdnLoginModal() {
	const hidden = `
    <style>
      .passport-login-container{
          display: none !important;
      }
    </style>
  `;
	document.head.innerHTML = document.head.innerHTML.concat(hidden);
}

window.onload = function () {
	const currHost = location.host + location.pathname;
	const jump = urlLib[currHost];
	if (jump) {
		const text = document.getElementsByTagName("body")[0].innerText;
		const url = httpString(text)[0];
		url && timeOut(q(jump), url);
	}

	// 自动重定向到中文文档
	if (location.host == "angular.io") {
		location.href = location.href.replaceAll(".io", ".cn");
	}

	if (currHost == LINKLIB.csdn) hiddenCsdnLoginModal();
};
