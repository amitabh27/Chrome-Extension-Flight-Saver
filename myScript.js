console.debug("initiated scraping!!");
var information1="";
var link1="";
var result="";
 
	var checkExist = setInterval(function() {
	//console.debug("check..");
					

					
					
		var elementExists = document.getElementsByClassName("EIGTDNC-d-W EIGTDNC-d-Lb EIGTDNC-d-S")[0];
		var noResults=document.getElementsByClassName("EIGTDNC-Wb-d")[0];
		if (elementExists !== null) {
			clearInterval(checkExist);
			console.debug("found..");
			information1=document.getElementsByClassName("EIGTDNC-d-W EIGTDNC-d-Lb EIGTDNC-d-S")[0].innerText;
			if(information1.indexOf("Best flights")>-1 || information1.indexOf("Best flight")>-1)
			{
			information1=document.getElementsByClassName("EIGTDNC-d-W EIGTDNC-d-Lb EIGTDNC-d-S")[1].innerText;
			}
			link1=document.getElementsByClassName("EIGTDNC-d-X EIGTDNC-d-t")[0].href;
			result=information1+"***"+link1;
				console.debug("this is it-->"+information1+link1)
				chrome.runtime.sendMessage({loc1: result}, function(response) {
				console.log(response.farewell);
				return true;
				});
				console.debug("finished scraping!!");
				}
				if(noResults!=null) {
										
				if(document.getElementsByClassName("EIGTDNC-Wb-d")[0].innerText=="No results found matching your criteria.")
				{
					clearInterval(checkExist);
					console.debug("Not found..");
					result="No"+"***"+"Results";
					chrome.runtime.sendMessage({loc1: result}, function(response) {
					console.log(response.farewell);
					return true;
					});
					//console.debug("finished scraping!!");
				}
								
				}
				//console.debug("Nothing found....CSS SELECTOR MALFUNCTION!!");
								
					}, 5000); 									
			





