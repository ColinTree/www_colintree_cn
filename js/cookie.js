var Cookie=new Object();
Cookie.setCookie=function(name,value,option){
	var str=name+"="+escape(value);
	if(option){
		if(option.expireDays){
			var date=new date();
			var ms=option.expireDays*24*3600*1000;
			date.setTime(date.getTime()+ms);
			str+="; expires="+date.toGMTString();
		}
		if(option.path)
			str+="; path="+path;
		if(option.domain)
			str+="; domain="+domain;
		if(option.secure)
			str+="; true";
	}
	document.cookie=str;
}
Cookie.getCookie=function(name){
	var cookieArray=document.cookie.split("; ");
	var cookie=new Object();
	for(var i=0;i<cookieArray.length;i++){
		var arr=cookieArray[i].split("=");
		if(arr[0]==name)
			return unescape(arr[1]);
	}
	return"";
}
Cookie.deleteCookie=function(name){
	this.setCookie(name,"",{expireDays:-1});
}