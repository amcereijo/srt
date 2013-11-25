
$(document).ready(function () {
	var labelForAccount = chrome.i18n.getMessage("placeholderForAccount");
	var labelForText = chrome.i18n.getMessage("placeholderForText");
	var buttonSearch = chrome.i18n.getMessage("buttonSearch");

	$('#account').attr('placeholder',labelForAccount);
	$('#text').attr('placeholder',labelForText);
	$('#search').val(buttonSearch);

	chrome.storage.local.get('account', function(data) {
      if (data.account)
        $('#account').val(data.account);
    });

	$('#search').click(function(){
		var account = $('#account').val(),
			text = $('#text').val();
		if(account!='' && text!=''){
			chrome.storage.local.set({account: account});
			var includeRetweets = "%20include%3Aretweets";
			var newURL = "https://twitter.com/search?q="+text+"%20from%3A"+account+includeRetweets+"&src=typd";
    		chrome.tabs.create({ url: newURL });
		}
	});

});