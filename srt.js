//var ExternFunction = 
/*(function() {

        //public methods
        return {
        	initPlugin : function () {
		alert('dentroq:'+accountList+","+account+","+text);	
					if(account!='' && text!=''){
					chrome.storage.local.set({account: account});
					alert('dentro3');
					if(!jQuery.inArray( account, accountList )){
						alert('dentro4');
						accountList.push(account);
						alert('dentro5:'+accountList);
						chrome.storage.local.set({accountList: accountList});
						alert('dentro6');
					}
					alert(accountList);
					var includeRetweets = "%20include%3Aretweets";
					var newURL = "https://twitter.com/search?q="+text+"%20from%3A"+account+includeRetweets+"&src=typd";
		    		//chrome.tabs.create({ url: newURL });
		    		//window.open(newURL);
		    		//return newURL;
				}
            }
        }
})//();
/*
alert("eu");
//execute when load
ExternFunction.initPlugin();
alert("eu");*/

			
	if(account!='' && text!=''){
		chrome.storage.local.set({account: account});
		alert('dentro3');
		if(!jQuery.inArray( account, accountList )){
			alert('dentro4');
			accountList.push(account);
			alert('dentro5:'+accountList);
			chrome.storage.local.set({accountList: accountList});
			alert('dentro6');
		}
		alert(accountList);
		var includeRetweets = "%20include%3Aretweets";
		newURL = "https://twitter.com/search?q="+text+"%20from%3A"+account+includeRetweets+"&src=typd";
		//chrome.tabs.create({ url: newURL });
		//window.open(newURL);
		//newURL;
		chrome.runtime.sendMessage({
            type: 'result',
            name: 'url',
            value: newURL
        });

        alert('fin');
	}
			