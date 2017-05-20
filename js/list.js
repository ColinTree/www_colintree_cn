function ele(str){return document.getElementById(str);}
function show(str){return ele(str).style.display="block";}
function hide(str){return ele(str).style.display="none";}

$(document).ready(function(){
    $('#loginregisterspan').on('click',function(){$('#login').click();return false;});
    $('#goBack').click(function(){window.history.back();return false;});
    //$('a').click(function(){location.href=$(this)[0].href;return false;});
});