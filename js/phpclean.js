$(document).ready(function(){
	$('form').submit(function(){
		var code=$('textarea').val();
		var len=code.length;
		var replaceList=['(',')','{','}','<','>','=','!',',','.',';','&','|','+','-','*','/','\\','%',':','case ','?'];
		replaceList.forEach(function(e){
			code=code.replace(e+' ',e);
			code=code.replace(' '+e,e);
		});
		$('textarea').val(code);
		var percent=(len==0 ? 0 : Math.round(code.length/len*10000)/100);
		$('div#form-framework h4 span').text(''+len+' => '+code.length+' ('+percent+'%)');
		return false;
	});
});