var resultStorage= [["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]];
var pointer=0;



chrome.runtime.onMessage.addListener(
				function(request, sender, sendResponse) {
						if(typeof request.loc11!=='undefined' && request.loc11!="" && request.loc11!=null)
						{
						console.log("message received in popup.js:"+request.loc11);
							
						var names=["Delhi","Mumbai","Bengaluru","Chennai","Kolkata","Kochi","Ahmedabad","Hyderabad","Pune","Dabolim",
									"Thiruvanthapuram","Lucknow","Jaipur","Guwahati","Kozikhode","Srinagar","Bhubneshwar","Vishakapatnam","Coimbatore","Indore",
									"Mangaluru","Nagpur","Patna","Chandigarh","Tiruchilapalli","Varnasi","Raipur","Amritsar","Jammu","Bagdora",
									"Vadodra","Agartala","Portblair","Madurai","Imphal","Ranchi","Udaipur","Dehradun","Bhopal","Leh",
									"Rajkot","Vijaywada","Tirupati","Dibrugarh","Jodhpur","Aurangabad","Rajahmundry","Silchar","Jabalpur","Aizwal"
									];

						var codes=[
									"DEL","BOM","BLR","MAA","CCU","COK","AMD","HYD","PNQ","GOI",
									"TRV","LKO","JAI","GAU","CCJ","SXR","BBI","VTZ","CJB","IDR",
									"IXE","NAG","PAT","IXC","TRZ","VNS","RPR","ATQ","IXJ","IXB",
									"BDQ","IXA","IXZ","IXM","IMF","IXR","UDR","DED","BHO","IXL",
									"RAJ","VJA","TIR","DIB","JDH","IXU","RJA","IXS","JLR","AJL"
									];
					
						var info=request.loc11;
						var way="";
						var amt=""; var time=""; var airline="";var duration="";var stops="";var flightNum="";
							if(info.indexOf("No***Results") > -1)
							{
							//console.debug("Nothing to be done");
							}
							else
							{
								if(info.indexOf("one way") > -1)
								{
								way="one way";
								amt=info.substring(info.indexOf("Rs"),info.indexOf("one way"));
								}
								else
								{
								amt=info.substring(info.indexOf("Rs"),info.indexOf("round trip"));
								way="round trip";
								}
								
								
								if(info.indexOf("SpiceJet") > -1)
								{
								airline="SpiceJet";
								if(info.indexOf("Alliance Air") > -1)
								airline=airline+", "+"Alliance Air";
								duration=info.substring(info.indexOf(airline)+airline.length,info.indexOf(airline)+airline.length+7);	
								
									if(way=="round trip")
									time=info.substring(info.indexOf("round trip")+10,info.indexOf("SpiceJet")-1);
									else
									time=info.substring(info.indexOf("one way")+7,info.indexOf("SpiceJet")-1);
								
								}
								if(info.indexOf("GoAir") > -1)
								{
								airline="GoAir";
								if(info.indexOf("Alliance Air") > -1)
								airline=airline+", "+"Alliance Air";
								duration=info.substring(info.indexOf(airline)+airline.length,info.indexOf(airline)+airline.length+7);
										
									if(way=="round trip")
									time=info.substring(info.indexOf("round trip")+10,info.indexOf("GoAir")-1);
									else
									time=info.substring(info.indexOf("one way")+7,info.indexOf("GoAir")-1);
								}
								if(info.indexOf("Air India") > -1)
								{
								airline="Air India";
								if(info.indexOf("Alliance Air") > -1)
								airline=airline+", "+"Alliance Air";
								duration=info.substring(info.indexOf(airline)+airline.length,info.indexOf(airline)+airline.length+7);
								
									if(way=="round trip")
									time=info.substring(info.indexOf("round trip")+10,info.indexOf("Air India")-1);
									else
									time=info.substring(info.indexOf("one way")+7,info.indexOf("Air India")-1);
								}
								if(info.indexOf("Jet Airways") > -1)
								{
								airline="Jet Airways";
								if(info.indexOf("Alliance Air") > -1)
								airline=airline+", "+"Alliance Air";
								duration=info.substring(info.indexOf(airline)+airline.length,info.indexOf(airline)+airline.length+7);
								
									if(way=="round trip")
									time=info.substring(info.indexOf("round trip")+10,info.indexOf("Jet Airways")-1);
									else
									time=info.substring(info.indexOf("one way")+7,info.indexOf("Jet Airways")-1);
								}
								if(info.indexOf("JetKonnect") > -1)
								{
								airline="JetKonnect";
								if(info.indexOf("Alliance Air") > -1)
								airline=airline+", "+"Alliance Air";
								duration=info.substring((info.indexOf(airline))+(2*airline.length)+3,(info.indexOf(airline))+(2*airline.length)+10);
								
									if(way=="round trip")
									time=info.substring(info.indexOf("round trip")+10,info.indexOf("JetKonnect")-1);
									else
									time=info.substring(info.indexOf("one way")+7,info.indexOf("JetKonnect")-1);
								}
								
								if(info.indexOf("IndiGo") > -1)
								{
								airline="IndiGo";
								if(info.indexOf("Alliance Air") > -1)
								airline=airline+", "+"Alliance Air";
								duration=info.substring(info.indexOf(airline)+airline.length,info.indexOf(airline)+airline.length+7);
								
									if(way=="round trip")
									time=info.substring(info.indexOf("round trip")+10,info.indexOf("IndiGo")-1);
									else
									time=info.substring(info.indexOf("one way")+7,info.indexOf("IndiGo")-1);
								}
								
								
								
								
								stops=info.substring(info.indexOf(duration)+7,info.indexOf("***"));
								flightNum=info.substring(info.indexOf("sel=")+4,info.indexOf("a=")-1);
								
								for(i=0;i<codes.length;i++)
								{
								if(flightNum.indexOf(codes[i]) > -1)
								flightNum=flightNum.replace(codes[i],"");
								}
						
								if(stops.indexOf(",") > -1)
								for(var i=0;i<names.length;i++)
								{
									if(stops.indexOf(codes[i]) > -1)
									stops=stops.replace(codes[i],names[i]);
								}
						
						
								//console.log("info="+info);
								time=time.replace(/\s+/, "");
								amt=amt.replace(/\s+/, "");
								airline=airline.replace(/\s+/, "");
								duration=duration.replace(/\s+/, "");
								stops=stops.replace(/\s+/, "");
								
								var flag=false;
								
								for(i=0;i<pointer;i++)
								{
									if(resultStorage[i][0]==airline)
									flag=true; //duplicate 
								}
								if(!flag)
								{
								console.log(pointer+"###"+"amt="+amt+"***"+"time="+time+"***"+"airline="+airline+"***"+"duration="+duration+"***"+"stops="+stops+"***"+"flightNum="+flightNum);
									resultStorage[pointer][0]=airline;
									resultStorage[pointer][1]=amt;
									resultStorage[pointer][2]=time;
									resultStorage[pointer][3]=duration;
									resultStorage[pointer][4]=stops;
									resultStorage[pointer][5]=flightNum;
									
									
									if(pointer==0)
									{

									 var para = document.getElementsByTagName("span")[0];
									 var tbl     = document.createElement("table");
									 tbl.id="dataTable";
									 var tblBody = document.createElement("tbody");
									 var row = document.createElement("tr");
									 
									 var cell1 = document.createElement("th"); 
									 var cell2 = document.createElement("th"); 
									 var cell3 = document.createElement("th"); 
									 var cell4 = document.createElement("th"); 
									 var cell5 = document.createElement("th"); 
									 var cell6 = document.createElement("th"); 
									 
									 var cellText1=document.createTextNode("Airline");
									 var cellText2=document.createTextNode("Amount");
									 var cellText3=document.createTextNode("Departure - Arrival");
									 var cellText4=document.createTextNode("Duration");
									 var cellText5=document.createTextNode("Stops");
									 var cellText6=document.createTextNode("Flight Number");
							
									  cell1.appendChild(cellText1);
									  cell2.appendChild(cellText2);
									  cell3.appendChild(cellText3);
									  cell4.appendChild(cellText4);
									  cell5.appendChild(cellText5);
									  cell6.appendChild(cellText6);
									  
									  row.appendChild(cell1);
									  row.appendChild(cell2);
									  row.appendChild(cell3);
									  row.appendChild(cell4);
									  row.appendChild(cell5);
									  row.appendChild(cell6);
									  
									  tblBody.appendChild(row);
									  tbl.appendChild(tblBody);
									  para.appendChild(tbl);
									}
									
									var parent=document.getElementById("dataTable");
									var rowI = parent.insertRow(pointer+1);
									
									 var cell11 = document.createElement("td"); 
									 var cell22 = document.createElement("td"); 
									 var cell33 = document.createElement("td"); 
									 var cell44 = document.createElement("td"); 
									 var cell55 = document.createElement("td"); 
									 var cell66 = document.createElement("td"); 
									 
									 var cellText11=document.createTextNode(resultStorage[pointer][0]);
									 var cellText22=document.createTextNode(resultStorage[pointer][1]);
									 var cellText33=document.createTextNode(resultStorage[pointer][2]);
									 var cellText44=document.createTextNode(resultStorage[pointer][3]);
									 var cellText55=document.createTextNode(resultStorage[pointer][4]);
									 var cellText66=document.createTextNode(resultStorage[pointer][5]);
									 
									  cell11.appendChild(cellText11);
									  cell22.appendChild(cellText22);
									  cell33.appendChild(cellText33);
									  cell44.appendChild(cellText44);
									  cell55.appendChild(cellText55);
									  cell66.appendChild(cellText66);
									  
									  rowI.appendChild(cell11);
									  rowI.appendChild(cell22);
									  rowI.appendChild(cell33);
									  rowI.appendChild(cell44);
									  rowI.appendChild(cell55);
									  rowI.appendChild(cell66);
									  
									  
									  
									
									pointer++;
									
									
								}
								
								
							}
							
						}
						return true;
});



document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('go');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
		
	
var from="";
var to="";
var date="";
var departureDate="";
var arrivalDate="";
var seats="";
var classType="";
var flightType="";
var t1="";
var t2="";



var e=document.getElementById("from");
from=e.options[e.selectedIndex].value;

e=document.getElementById("to");
to=e.options[e.selectedIndex].value;

e=document.getElementById("t1");
t1=e.options[e.selectedIndex].value;

e=document.getElementById("t2");
t2=e.options[e.selectedIndex].value;

departureDate=document.forms["reg"]["datePos1"].value;
arrivalDate=document.forms["reg"]["datePos2"].value;
seats=document.forms["reg"]["count"].value;

if(document.getElementById("flightType1").checked)
flightType=document.getElementById("flightType1").value;
if(document.getElementById("flightType2").checked)
flightType=document.getElementById("flightType2").value;

if(document.getElementById("flightClass1").checked)
classType=document.getElementById("flightClass1").value;
if(document.getElementById("flightClass2").checked)
classType=document.getElementById("flightClass2").value;
if(document.getElementById("flightClass3").checked)
classType=document.getElementById("flightClass3").value;


//console.debug(from);
//console.debug(to);
//console.debug(departureDate);
//console.debug(arrivalDate);
//console.debug(seats);
//console.debug(flightType);
//console.debug(classType);
//console.debug(t1);
//console.debug(t2);

var checking=false;

	if(isEmptyChecker(from,to,departureDate,arrivalDate,seats,flightType,classType,t1,t2))
	{

			if(seatValidator(seats))
			{
				if(isDateCorrect(departureDate,arrivalDate,flightType))
				{
				flightInfo(from,to,departureDate,arrivalDate,seats,flightType,classType,t1,t2);
				console.log("this is where flight info was called from");
				return true;
				}
				else
				{
				document.querySelector("#errMsg").innerHTML = "Please specify the date in correct format.";
				//console.debug("Constraint violation : Date");
				return false;
				}	
			}
			else
			{
			document.querySelector("#errMsg").innerHTML = "Please specify the count of seats correctly (Max Value-6).";
			//console.debug("Constraint violation : Number of seats");
			return false;
			}

	}
	else
	{
	document.querySelector("#errMsg").innerHTML = "Please provide the complete information.";
	//console.debug("Constraint violation : Empty field found");
	return false;
	}
	
console.log("time to quit popup.js");
 });
  }, false);
  
  function isEmptyChecker(from,to,departureDate,arrivalDate,seats,flightType,classType,t1,t2)
  {
	  if(from==null || from=="" || to==null || to=="" || departureDate==null || departureDate=="" || seats==null || seats=="" ||
	  flightType==null || flightType=="" || classType==null || classType=="" || t1==null || t1=="" || t2==null || t2==""
	  )
	  {
	  return false;
	  }
	  if(flightType=="roundTrip" && (arrivalDate==null || arrivalDate==""))
	  {
	  return false;
	  }
	  if(from==to)
	  return false;
	  
	  return true;
  }
  
  function seatValidator(seats)
  {
  if(isNaN(seats))
  return false;
  if(seats=="0")
  return false;
  if(seats>6)
  return false;
  
  return true;
  }
  
  function isDateCorrect(departureDate,arrivalDate,flightType)
  {
  
	//-----Departure-------
	if(departureDate.length==10)
	{
	var today = new Date();
	var day=departureDate.substring(0,2);
	var month=departureDate.substring(3,5);
	var year=departureDate.substring(6,departureDate.length);
	//console.debug("day="+day+"month="+month+"year="+year);
	
		if(isNaN(day) || isNaN(month) || isNaN(year))
		{
		//console.debug("Improper date format.");
		return false;
		}
		if( departureDate.charAt(2)!='/' || departureDate.charAt(5)!='/')
		{
		//console.debug("Please use the delimiter for date as specified.");
		return false;
		}
		if(month>12 || month<=0 || day<=0 || day>31 || year<today.getFullYear())
		{
		//console.debug("Incorrect date1");
		return false;
		}
		if(month==4 || month==6 || month==9 || month==11)
		{
			if(!(day<=30))
			{
			//console.debug("Incorrect date2");
			return false;
			}
		}
		if(month==2 && ((month%4==0) && (month%100==0) && (month%400==0)))
		{
			if(!(day<=29))
			{
			//console.debug("Incorrect date3");
			return false;
			}
		}
		if(month==2 && !((month%4==0) && (month%100==0) && (month%400==0)))
		{
			if(!(day<=28))
			{
			//console.debug("Incorrect date4");
			return false;
			}
		}
		if(month<(today.getMonth()+1) && day < today.getDate() && year==today.getFullYear())
		{
		//console.debug("Incorrect date5");
		return false; 
		}
		
	}
	else
	{
	//console.debug("Improper date format.");
	return false;
	}
	
	//-----Arrival-----

	if(flightType.localeCompare("roundTrip")==0)
	{
	
		if(arrivalDate.length==10)
		{
		var today = new Date();
		var day=arrivalDate.substring(0,2);
		var month=arrivalDate.substring(3,5);
		var year=arrivalDate.substring(6,arrivalDate.length);
		//console.debug("day="+day+"month="+month+"year="+year);
		
			if(isNaN(day) || isNaN(month) || isNaN(year))
			{
			//console.debug("Improper date format.");
			return false;
			}
			if( arrivalDate.charAt(2)!='/' || arrivalDate.charAt(5)!='/')
			{
			//console.debug("Please use the delimiter for date as specified.");
			return false;
			}
			if(month>12 || month<=0 || day<=0 || day>31 || year<today.getFullYear())
			{
			//console.debug("Incorrect date1");
			return false;
			}
			if(month==4 || month==6 || month==9 || month==11)
			{
				if(!(day<=30))
				{
				//console.debug("Incorrect date2");
				return false;
				}
			}
			if(month==2 && ((month%4==0) && (month%100==0) && (month%400==0)))
			{
				if(!(day<=29))
				{
				//console.debug("Incorrect date3");
				return false;
				}
			}
			if(month==2 && !((month%4==0) && (month%100==0) && (month%400==0)))
			{
				if(!(day<=28))
				{
				//console.debug("Incorrect date4");
				return false;
				}
			}
			if(month<(today.getMonth()+1) && day < today.getDate() && year==today.getFullYear())
			{
			//console.debug("Incorrect date5");
			return false; 
			}
			
		}
		else
		{
		//console.debug("Improper date format.");
		return false;
		}
	}
	
	//Analysing true sense of arrival & departure
	
	if(flightType.localeCompare("roundTrip")==0)
	{
	var day2=arrivalDate.substring(0,2);
	var month2=arrivalDate.substring(3,5);
	var year2=arrivalDate.substring(6,arrivalDate.length);
	var day1=departureDate.substring(0,2);
	var month1=departureDate.substring(3,5);
	var year1=departureDate.substring(6,departureDate.length);
	
	if(!(year1<=year2))
	return false;
	
	if(year1==year2 && !(month1<=month2))
	return false;
	
	if(year1==year2 && month1==month2 && !(day1<=day2))
	return false;
	}
	
	return true;
	
  }
  
  function flightInfo(from,to,departureDate,arrivalDate,seats,flightType,classType,t1,t2)
  {
  
	//console.debug("inside flightInfo-->"+from+" "+to+" "+departureDate+" "+arrivalDate+" "+seats+" "+flightType+" "+classType+" "+t1+" "+t2);
	var consolidatedData=from.concat("*").concat(to).concat("**").concat(departureDate).concat("***").concat(arrivalDate).concat("****").concat(seats).concat("*****").concat(flightType).concat("******").concat(classType).concat("*******").concat(t1).concat("********").concat(t2);
	
	document.querySelector("#errMsg").innerHTML = "Gathering results...";
	chrome.extension.getBackgroundPage().urlGenerator(consolidatedData);
	
	
  }
}, false);
