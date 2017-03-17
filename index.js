/*
 * FileName：index.js
 * Direct: 个人主页，主要就是收集喜欢的网站放在主页
 *         1. 搜索引擎，方便搜索内容，暂时只有百度
 *         2. 网站搜索，能够更便捷的浏览网站
 *         3. 添加喜欢的网址功能，能够随时将网址收藏
 * 
 */

/* 全局变量定义*/
var cntSites = 0;

/*
 * Function：window.onload
 * 页面加载函数
 * 当文档加载完成后，会调用这个函数。
 * 主要是做一些初始化动作。
 */
window.onload = function() {
	document.getElementById("add_site").onclick = showWin;
	document.getElementById("firm").onclick = addSite;
	document.getElementById("cancel").onclick = hiddenWin;
	sitesFresh();
	//superimportionTree();
}

function checkHttps() {
	BaiduHttps.useHttps();    
}

function baiduWithHttps(formname) {
	var data = BaiduHttps.useHttps();
	if (data.s === 0) {
		return true;
	}
	else {
		formname.action = 'https://www.baidu.com/baidu' + '?ssl_s=1&ssl_c' + data.ssl_code;
		return true;
	}
}

/*
 * Function：showWin()
 * 显示添加网址的窗口！
 */
function showWin() {
	document.getElementById("WinBack").style.display = "block";
	document.getElementById("WinShow").style.display = "block";
	console.log("显示添加网址的窗口！");
}

/*
 * Function：showWin()
 * 关闭/隐藏添加网址的窗口！
 */
function hiddenWin() {
	document.getElementById("WinBack").style.display = "none";
	document.getElementById("WinShow").style.display = "none";
}

/*
 * Function: addSite()
 * 收藏网址函数
 */
function addSite() {
	writeLocalStorage();
    hiddenWin();
}

/*
 * Function: addSiteInit()
 * 添加地址时的初始化
 */
function addSiteInit() {
	document.getElementById("tar_name").value = "";
	document.getElementById("tar_url").value = "";
}

/*
 * Function: getLocalStorage()
 * 获得浏览器的本地存储句柄。
 */
function getLocalStorage () {
	try {
		if(!!window.localStorage)
			console.log("返回正确的本地存储句柄。")
			return window.localStorage;
	} catch(e) {
		console.log("此浏览器不支持本地存储！");
		return undefined;
	}
}

/*
 * Function: writeLocalStorage()
 * 将网址内容打包成JSON，存入本地存储。
 */
function writeLocalStorage() {
	var localStorage = getLocalStorage();
	var data = new Object;
	var divElement, aElement, textnode;
	var sitesElement = document.getElementById("sites");
	var lastElement = document.getElementById("add_site");

	data.id = cntSites;
	data.name = document.getElementById("tar_name").value;
	data.url = document.getElementById("tar_url").value;
	
	if(isnull(data.name) && isnull(data.url)) {
		console.log("输入框不能为空哦！")
		return;
	}

	if(!isUrlHttp(data.url)) {
		data.url = "http://" + data.url;
	}
	
	var jsonSite = JSON.stringify(data);
	localStorage.setItem(data.id, jsonSite);
	console.log("Get到一个新网址！")
	
	textnode = document.createTextNode(data.name);
	
	aElement = document.createElement("a");
	aElement.setAttribute("target", "_blank");
	aElement.setAttribute("href", data.url);
	aElement.appendChild(textnode);
	
	divElement = document.createElement("div");
	divElement.setAttribute("id", "link");
	divElement.appendChild(aElement);
	
	sitesElement.insertBefore(divElement, lastElement);
	
}

/*
 * Function: isUrlHttp()
 * 确认当前字符串是合法的万维网网址
 */
function isUrlHttp(url) {
	if(url.slice(0, 7) == "http://")
		return true;
	if(url.slice(0, 8) == "https://")
		return true;
	return false;
}

/*
 * Function: sitesFresh()
 * 刷新页面，确保网址全部都出现在页面上
 */
function sitesFresh() {
	var localStorage = getLocalStorage();
	var indexSite = 0;
	var infoSite;
	var infoArray = new Array(); //用来存储json数组
	var data;
	var divElement, aElement, textnode;
	var sitesElement = document.getElementById("sites");
	var lastElement = document.getElementById("add_site");
	
	while(1) {
		infoSite = localStorage.getItem(indexSite);
		if(!infoSite) {
			console.log("已经收藏了" + indexSite + "个网址了！");
			cntSites = indexSite;
			break;
		}
		indexSite++;
		infoArray.push(infoSite);
	}
	if(cntSites == 0) {
		console.log("没有收藏网站，不需要添加！");
		return;
	}
	for(var i in infoArray) {
		data = JSON.parse(infoArray[i]);
		console.log("id=" + data.id + " name=" + data.name + " url=" + data.url);
		textnode = document.createTextNode(data.name);
		
		aElement = document.createElement("a");
		aElement.setAttribute("target", "_blank");
		aElement.setAttribute("href", data.url);
		aElement.appendChild(textnode);
		
		divElement = document.createElement("div");
		divElement.setAttribute("id", "link");
		divElement.appendChild(aElement);
		
		sitesElement.insertBefore(divElement, lastElement);
	}
	console.log("收藏的网址已遍历一遍了");
}

/*
 * Function: isnull()
 * 判断一个字符串是否为空字符串，或只包含空格
 * return:若为空返回true，若含有字符串则为false
*/
function isnull(val) {
	var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;

	if (str == '' || str == undefined || str == null) {
		return true;
	} else {
		return false;
	}
}
