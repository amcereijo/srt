
$(document).ready(function () {
	var labelForAccount = chrome.i18n.getMessage("placeholderForAccount"),
		labelForText = chrome.i18n.getMessage("placeholderForText"),
		buttonSearch = chrome.i18n.getMessage("buttonSearch"),
		accountList=[],
		addElement = function ( elem ) {
		    accountList.push( elem );
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
    		alert(accountList);
    	}
    });
	
	$( "#account" ).autocomplete({
      source: accountList
    });

	$('#search').click(function(){
		var account = $('#account').val(),
			text = $('#text').val();
		if(account!='' && text!=''){
			chrome.storage.local.set({account: account});
			if(!jQuery.inArray( account, accountList )){
				accountList.push(account);
				chrome.storage.local.set({accountList: accountList});
			}
			alert(accountList);
			
			var includeRetweets = "%20include%3Aretweets";
			var newURL = "https://twitter.com/search?q="+text+"%20from%3A"+account+includeRetweets+"&src=typd";
    		chrome.tabs.create({ url: newURL });
		}
	});

});