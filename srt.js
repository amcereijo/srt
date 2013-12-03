$(document).ready(function () {
       
var labelForAccount = chrome.i18n.getMessage("placeholderForAccount"),
		labelForText = chrome.i18n.getMessage("placeholderForText"),
		buttonSearch = chrome.i18n.getMessage("buttonSearch"),
		accountListShow=[],
		addElement = function ( elem ) {
		    accountListShow.push(elem);
		};

	$('#account').attr('placeholder',labelForAccount);
	$('#text').attr('placeholder',labelForText);
	$('#search').val(buttonSearch);

	chrome.storage.local.get('account', function(data) {
      if (data.account) {  $('#account').val(data.account); }	
    });
	chrome.storage.local.get('accountList', function(data) {

      	if (data.accountList){
      		data.accountList.forEach( addElement );
    	}
    });
	
	$( "#account" ).autocomplete({
      source: accountListShow
    });

	$('#search').click(function(){
		var account = $('#account').val(),
			text = $('#text').val(),newURL='a';
		
		if(account!='' && text!=''){
			chrome.storage.local.set({account: account});
			if(jQuery.inArray( account, accountListShow )<0){
				accountListShow.push(account);
				chrome.storage.local.set({accountList: accountListShow});
			}
			var includeRetweets = "%20include%3Aretweets";
			newURL = "https://twitter.com/search?q="+text+"%20from%3A"+account+includeRetweets+"&src=typd";
			chrome.tabs.create({ url: newURL });
		}

	}); 
});