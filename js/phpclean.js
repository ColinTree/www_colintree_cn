$(document).ready(function(){
	$('form').submit(function(){
		var code=$('textarea').val();
		var len=code.length;
		var replaceList=['(',')','{','}','<','>','=','!',',','.',';','&','|','+','-','*','/','\\','%',':','case ','?'];
		while(true){
			var code_=code;
			replaceList.forEach(function(e){
				code=code.replace(e+' ',e);
				code=code.replace(' '+e,e);
			});
			if(code_==code)
				break;
		}
		$('textarea').val(code);
		var percent=(len==0 ? 0 : Math.round(code.length/len*10000)/100);
		$('div#form-framework h4 span').text(''+len+' => '+code.length+' ('+percent+'%)');
		return false;
	});
	var if_show=false;//iframe showed
	$('div#form-framework h4 a').click(function(){
		if(if_show){
			if_show=false;
			$('iframe').hide();
			$('textarea').css('height','100%');
		}else{
			if_show=true;
			$('iframe').show();
			$('textarea').css('height','30%');
		}
		return false;
	});
});
