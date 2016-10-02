
function checkHttps () {
	BaiduHttps.useHttps();    
}

function baiduWithHttps (formname) {
	var data = BaiduHttps.useHttps();
	if (data.s === 0) {
		return true;
	}
	else {
		formname.action = 'https://www.baidu.com/baidu' + '?ssl_s=1&ssl_c' + data.ssl_code;
		return true;
	}
}

function ShowWin() {
	document.getElementById("WinBack").style.display = "block";
	document.getElementById("WinShow").style.display = "block";
}

function addSite() {
	document.getElementById("WinBack").style.display = "none";
	document.getElementById("WinShow").style.display = "none";
}

window.onload = function() {
	document.getElementById("add_site").onclick = ShowWin;
	document.getElementById("firm").onclick = addSite;

}