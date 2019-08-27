
// 设置 rem 函数
function setRem () {
	let docEl = document.documentElement,
		clientWidth = docEl.clientWidth;
	if (!clientWidth) return;
 // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
 const scale =100 * (clientWidth / 750) + 'px';
 console.log(clientWidth)
 // 设置页面根节点字体大小
 document.documentElement.style.fontSize =  scale;

}
// 初始化
// setRem()
// 改变窗口大小时重新设置 rem
(window.onresize = function () {
 setRem()
})()