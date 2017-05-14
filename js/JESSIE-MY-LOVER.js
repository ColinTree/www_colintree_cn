$(document).ready(function(){
	console.log(Cookie.getCookie('i_love'));
	if(Cookie.getCookie('i_love')=='babe_jessie'){
		Cookie.setCookie('i_love','baby_jessie');
		$('#page0').hide();
		$('#page1').show();
		document.title="谨记着 这美好的一切";
		console.log('show page1');
	}else{
		Cookie.setCookie('i_love','babe_jessie');
		$('#page0').hide();
		$('#page2').show();
		document.title="不知从何而起，一往情深";
		console.log('show page2');
	}
	console.log(Cookie.getCookie('i_love'));
});