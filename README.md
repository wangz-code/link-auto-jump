# AutoJump chrome 网页外链跳转插件

-   理论适用于所有网页 点击链接后直接打开 避免手工再次点击恶心人的 "继续访问" 的沙雕操作
-   新增: angular.io 自动跳转到中文站
-   新增: antdv.com 自动跳转到中文站

# 核心判断规则

```js
const bodyText = document.body.innerText;
// httpString 提取字符串中的链接
const urls = httpString(bodyText); 
if (bodyText.length < 100 && urls && urls.length == 1 && bodyText.includes("安全")) {
	window.close();
	window.open(urls[0]);
}
```

## 使用前

[<img src="https://s4.ax1x.com/2021/12/06/ossk8O.md.png" alt="ossk8O.md.png" style="zoom: 50%;" />](https://imgtu.com/i/ossk8O)

[<img src="https://raw.githubusercontent.com/WangSunio/img/main/images/202212301024421.png" alt="ossk8O.md.png" style="zoom: 50%;" />]()

## 使用后 确认页面一闪而过
