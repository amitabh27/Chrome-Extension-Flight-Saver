////console.debug("this is it-background");
var message_received="";

function urlGenerator(tempUrl)
{
 ////console.debug("parameters received in bg.js:"+tempUrl);
		var from=tempUrl.substring(0,tempUrl.indexOf("*"));
		var to=tempUrl.substring(tempUrl.indexOf("*")+1,tempUrl.indexOf("**"));
		var departureDate=tempUrl.substring(tempUrl.indexOf("**")+2,tempUrl.indexOf("***"));
		var arrivalDate=tempUrl.substring(tempUrl.indexOf("***")+3,tempUrl.indexOf("****"));
		var seats=tempUrl.substring(tempUrl.indexOf("****")+4,tempUrl.indexOf("*****"));
		var flightType=tempUrl.substring(tempUrl.indexOf("*****")+5,tempUrl.indexOf("******"));
		var classType=tempUrl.substring(tempUrl.indexOf("******")+6,tempUrl.indexOf("*******"));
		var t1=tempUrl.substring(tempUrl.indexOf("*******")+7,tempUrl.indexOf("********"));;
		var t2=tempUrl.substring(tempUrl.indexOf("********")+8,tempUrl.length);;
		
		////console.debug("--->"+from+" "+to+" "+departureDate+" "+arrivalDate+" "+seats+" "+flightType+" "+classType+" "+t1+" "+t2);
		
		var urlToBeLoaded="https://www.google.co.in/flights/#search;";
		
		for(var i=1;i<=5;i++)
		{
		if(i==1)
		scrapeDetails(from,to,departureDate,arrivalDate,seats,flightType,classType,urlToBeLoaded,t1,t2,"indigo");
		if(i==2)
		scrapeDetails(from,to,departureDate,arrivalDate,seats,flightType,classType,urlToBeLoaded,t1,t2,"airindia");
		if(i==3)
		scrapeDetails(from,to,departureDate,arrivalDate,seats,flightType,classType,urlToBeLoaded,t1,t2,"spicejet");
		if(i==4)
		scrapeDetails(from,to,departureDate,arrivalDate,seats,flightType,classType,urlToBeLoaded,t1,t2,"jetairways");
		if(i==5)
		scrapeDetails(from,to,departureDate,arrivalDate,seats,flightType,classType,urlToBeLoaded,t1,t2,"goair");
		}
		


}

function scrapeDetails(from,to,departureDate,arrivalDate,seats,flightType,classType,urlToBeLoaded,t1,t2,airline)
	{
	var day1="";
	var month1="";
	var year1="";
	day1=departureDate.substring(0,departureDate.indexOf('/',0));
	month1=departureDate.substring(departureDate.indexOf('/',0)+1,departureDate.indexOf('/',3));
	year1=departureDate.substring(departureDate.indexOf('/',3)+1,departureDate.length);
	
	urlToBeLoaded=urlToBeLoaded.concat("f=").concat(from).concat(";t=").concat(to).concat(";d=").concat(year1).concat("-").concat(month1).concat("-").concat(day1).concat(";");
	if(flightType=="roundTrip")
	{
	day1=arrivalDate.substring(0,arrivalDate.indexOf('/',0));
	month1=arrivalDate.substring(arrivalDate.indexOf('/',0)+1,arrivalDate.indexOf('/',3));
	year1=arrivalDate.substring(arrivalDate.indexOf('/',3)+1,arrivalDate.length);
	
	urlToBeLoaded=urlToBeLoaded.concat("r=").concat(year1).concat("-").concat(month1).concat("-").concat(day1).concat(";");
	}
	
	if(flightType=="oneWay")
	urlToBeLoaded=urlToBeLoaded.concat("tt=o;");
	
	if(classType=="premiumEconomy")
	urlToBeLoaded=urlToBeLoaded.concat("sc=p;");
	if(classType=="business")
	urlToBeLoaded=urlToBeLoaded.concat("sc=b;");
	
	if(seats>1)
	urlToBeLoaded=urlToBeLoaded.concat("px=").concat(seats).concat(";");
	
	urlToBeLoaded=urlToBeLoaded.concat("so=p;");
	if(airline=="indigo")
	urlToBeLoaded=urlToBeLoaded.concat("a=6E;");
	if(airline=="airindia")
	urlToBeLoaded=urlToBeLoaded.concat("a=AI;");
	if(airline=="spicejet")
	urlToBeLoaded=urlToBeLoaded.concat("a=SG;");
	if(airline=="jetairways")
	urlToBeLoaded=urlToBeLoaded.concat("a=9W;");
	if(airline=="goair")
	urlToBeLoaded=urlToBeLoaded.concat("a=G8;");
	
	if(!t1.indexOf("00") ==0 || !t2.indexOf("23") ==0)
	urlToBeLoaded=urlToBeLoaded.concat("ti=t").concat(t1).concat("00-").concat(t2).concat("00;");
	urlToBeLoaded=urlToBeLoaded.concat("q=flights");
	
	
		
	//console.log("Now calling urlLoader -->url="+urlToBeLoaded);
	urlLoader(urlToBeLoaded);
	
	
	chrome.runtime.onMessage.addListener(
				function(request, sender, sendResponse) {
						sendResponse({farewell: "goodbye"});
						//console.log("message received in bg.js:"+request.loc1);
							
							chrome.runtime.sendMessage({loc11: request.loc1}, function(response) {
															//console.log("Message sent from bj.js for popup.js");
															
															return true;
															});
							
						return true;
	});
		
}

function urlLoader(urlToBeLoaded)
{
//chrome.tabs.create({ url: urlToBeLoaded });
chrome.tabs.create({ url: urlToBeLoaded,active : false},function(tab){
                                                setTimeout(function(){chrome.tabs.remove(tab.id);}, 30000);
                                    });
/*var x = new XMLHttpRequest();
x.open('GET', urlToBeLoaded);*/


	

}

