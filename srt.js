$(document).ready(function () {
       
	var labelForAccount = chrome.i18n.getMessage("placeholderForAccount"),
		labelForText = chrome.i18n.getMessage("placeholderForText"),
		buttonSearch = chrome.i18n.getMessage("buttonSearch"),
		includeRetweets = "%20include%3Aretweets",
		accountListShow=[],
		accountEl = $('#account'),
		textEl = $('#text'),
		searchEl = $('#search'),
		addElement = function ( elem ) { //function to add elements to a acoount array
		    accountListShow.push(elem);
		},
		search = function(){ //function to make a search
			var accountVal = accountEl.val(),
				textVal = textEl.val(),
				newURL='a';
			
			if(accountVal!=='' && textVal!==''){	
				chrome.storage.local.set({account: accountVal});
				if(jQuery.inArray( accountVal, accountListShow )<0){
					accountListShow.push(accountVal);
					chrome.storage.local.set({accountList: accountListShow});
				}
				newURL = "https://twitter.com/search?q="+textVal+"%20from%3A"+accountVal+includeRetweets+"&src=typd";
				chrome.tabs.create({ url: newURL });
			}

		};

	//prepare plugin view
	accountEl.attr('placeholder',labelForAccount);
	textEl.attr('placeholder',labelForText);
	searchEl.val(buttonSearch);

	//prepare last account where search
	chrome.storage.local.get('account', function(data) {
      if (data.account) {  accountEl.val(data.account); }	
    });

	//load auto complete account list
	chrome.storage.local.get('accountList', function(data) {
      	if (data.accountList){
      		data.accountList.forEach( addElement );
    	}
    });
    //add auto complete account list
	accountEl.autocomplete({
      source: accountListShow
    });

	//event to launch a search
	searchEl.click(search);
	accountEl.keyup(function(e){
	    if(e.keyCode === 13){
	        search();
	    }
	});
});