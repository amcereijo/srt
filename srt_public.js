$(document).ready(function () {
       
var labelForAccount = chrome.i18n.getMessage("placeholderForAccount"),
		labelForText = chrome.i18n.getMessage("placeholderForText"),
		buttonSearch = chrome.i18n.getMessage("buttonSearch"),
		accountList=[],
		addElement = function ( elem ) {
		    accountList.push( "'"+elem+"'" );
		};

	$('#account').attr('placeholder',labelForAccount);
	$('#text').attr('placeholder',labelForText);
	$('#search').val(buttonSearch);

	//alert("initPlugin- account:"+$('#account')+", text:"+$('#text')+",search:"+$('#search'));

	chrome.storage.local.get('account', function(data) {
      if (data.account) {  $('#account').val(data.account); }	
    });
	chrome.storage.local.get('accountList', function(data) {

      	if (data.accountList){

//      		accountList = new Array(data.accountList);
      		data.accountList.forEach( addElement );
    		alert("Loaded accountList:"+accountList);
    	}
    });
	
	$( "#account" ).autocomplete({
      source: accountList
    });

	$('#search').click(function(){
		
		var account = $('#account').val(),
					text = $('#text').val(),newURL='a';
		alert('lanza:'+account+","+text+", Params:"+"var accountList = ["+accountList+"],account='"+account+"',text='"+text+"';");
		chrome.tabs.executeScript(null, {file: "jquery-1.9.1.min.js"}, function(){
		    chrome.tabs.executeScript(null, {code: "var accountList = ["+accountList+"],account='"+account+"',text='"+text+"';"}, function(){
		        chrome.tabs.executeScript(null, {file: "srt.js"}, function(){ 
		        });
		    });
		});
		alert('lanzado');
	});

	chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	    if (request.type == 'result') {
	        chrome.tabs.create({ url: request.value });
	    }
	});

        
});