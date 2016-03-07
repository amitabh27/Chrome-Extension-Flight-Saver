//console.debug("initiated scraping!!");
var information1="";
var link1="";
var result="";
 
			var checkExist = setInterval(function() {
					//console.debug("check..");
					

					
					
					var elementExists = document.querySelector("div.CNAVQLC-d-W");
					var noResults=document.querySelector("div.CNAVQLC-Nb-d");
								if (elementExists !== null) {
										clearInterval(checkExist);
										//console.debug("found..");
										information1=document.querySelector("div.CNAVQLC-d-W").innerText;
										link1=document.querySelector("div.CNAVQLC-d-W a").href;
										result=information1+"***"+link1;
												//console.debug("this is it-->"+information1+link1)
												chrome.runtime.sendMessage({loc1: result}, function(response) {
															console.log(response.farewell);
															return true;
															});
										//console.debug("finished scraping!!");
															}
								if(noResults!=null) {
										
										if(document.querySelector("div.CNAVQLC-Nb-d").innerText=="No results found matching your criteria.")
														{
														clearInterval(checkExist);
														//console.debug("Not found..");
														result="No"+"***"+"Results";
														chrome.runtime.sendMessage({loc1: result}, function(response) {
															console.log(response.farewell);
															return true;
															});
														//console.debug("finished scraping!!");
														}
								
														}
								
													}, 50); 
			





