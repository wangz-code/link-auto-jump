// function httpString(s) {
//   //var reg = /(https:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
//   var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
//   s = s.match(reg);
//   return s;
// }

// 跳转倒计时
const timeOut = function (button) {
  button.innerText = "即将跳转...3秒";
  let ms = 2;
  const timer = setInterval(function () {
    if (ms <= 1) {
        button.innerText= "已跳转"
      const url = location.href.split("?target=")[1];
      url && window.open(decodeURIComponent(url));
      clearInterval(timer);
    } else {
      button.innerText = "即将跳转..." + ms + "秒";
      ms--;
    }
  }, 1000);
};

// 获取页面dom
function q(options = {}) {
  return document[options.c](options.el)[0];
}

// 网址库
const urlLib = {
  "link.juejin.cn": {
    el: "button",
    c: "getElementsByTagName",
    method: timeOut,
  },
  "link.csdn.net": {
    el: "loading-btn",
    c: "getElementsByClassName",
    method: timeOut,
  },
  "link.zhihu.com": {
    el: "button",
    c: "getElementsByClassName",
    method: timeOut,
  },
};

window.onload = function () {
  const currHost = location.host;
  const jump = urlLib[currHost];
  jump && jump.method(q(jump));
};
