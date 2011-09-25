//Note:First truncate this string

var allCommandsArray=[];
var neededNumbersArray=[];
var neededCommandsAndNumbersString="";

	function determineArrays()
	{ 
		var allOptionsString="command down,command up,command back,command forward,command home,one,two,three,four,five,six,seven,eight,nine,ten";// list
																																						// of
																																						// all
																																						// the
																																						// possible
																																						// input
																																						// commands
		oneIndex=allOptionsString.indexOf("one");
		if (oneIndex !=-1)
			{
			// Extract all the required commands
			var allCommandsString= allOptionsString.slice(0,oneIndex-1);
			allCommandsArray=allCommandsString.split(",");// An array used to
															// determine
															// commands
			
			// Determine how many numbers needed in vocab (used for link
			// references)
			
			var allLinkNumbersString= allOptionsString.slice(oneIndex);
			var allNumbersArray=allLinkNumbersString.split(",");// Returns all
																// the numbers
			var linkCount=document.links.length;// Find the number of numbers
												// needed
			neededNumbersArray=allNumbersArray.slice(0,linkCount);
			
			// join the needed commands and needed numbers
			// allCommandsArray.push(",");//A comma which will be used for
			// joining the two arrays
			var neededCommandsAndNumbersArray=[];
			neededCommandsAndNumbersArray=neededCommandsAndNumbersArray.concat(allCommandsArray,neededNumbersArray);
			neededCommandsAndNumbersString=neededCommandsAndNumbersArray.toString();
			// Convert back to string
			
			return neededCommandsAndNumbersString;
			}
		
	}
    function onLoaded() 
    {	 setSwitchFocus(1);//Set focus to the switch used for activation
     
    
    	var neededSpeechSpace=determineArrays();
        speechapi.setupRecognition("SIMPLE", neededSpeechSpace ,false);
        hideFlash();
        //Put something here that shows an image to indicate that the flash player is ready... 
	}
    //global stuff
    
       var flashvars = {speechServer : "http://www.speechapi.com:8000/speechcloud"};
       var params = {allowscriptaccess : "always"};
       var attributes = {};
       attributes.id = "flashContent";
       swfobject.embedSWF("http://www.speechapi.com/static/lib/speechapi-1.5.swf", "myAlternativeContent", "215", "138", "9.0.28", false,flashvars, params, attributes);
       speechapi.setup("freecole","0706009y",onResult,onFinishTTS, onLoaded, "flashContent");
  
    function onResult(result) 
    {
    	document.getElementById('answer').innerHTML = result.text;
    
    	processResult(result);
    }
        
    function onFinishTTS() { }
 
   

// General purpose functions
	function processResult(result)
	{
		if (!tryProcessResultAsCommand(result))
		{
	      tryProcessResultAsLink(result);
		}
		
			
	}
	
	// Checks to see if a link number was called
	function tryProcessResultAsLink(result)
	{
		var index=searchForLinkIndex(result);// find index used to follow
												// links
		// document.getElementById('index').innerHTML=index.text;
	
		if (index !=-1){ // if link exists, follow link
			var links=AssignLinkNumbers();// put links into index referable
											// form
			var myLink=links[index];// retrieve the link to be followed
			document.location.href = myLink;// follow it
			document.getElementById('link').innerHTML=myLink;
		}
	}
	
	// checks to see if a command was called
	function tryProcessResultAsCommand(result)
	{
		 var index=searchForCommandIndex(result);
		switch(index){
		case 0:	scrolldown();
				break;
		case 1:	scrollup();
				break;
		case 2:	goback();
				break;
		case 3:	goforward();
				break;
		case 4:	gohome();
				break;
		default:return false; 
		}
		return true;

		
	}
	
	

	function AssignLinkNumbers() 
	{	
		var linkCount=document.links.length;
		var urlnumbers=[]; // An array to store number link assosiations
		var theLink="empty";
		var i=0;
		for (i=0; i<linkCount; i++) 
		{
			theLink = (document.links[i]);
			urlnumbers[i]=theLink;
		}
	
		return urlnumbers;
	}
	// Note:This searches a clean array with no commands because it is used to
	// align commands with links
	function searchForLinkIndex(result)
	{
		var i=0;
		for (i=0; i<neededNumbersArray.length; i++) 
		{ 
			if (neededNumbersArray[i]==result.text) 
			{
				return i;
				
			} 
		}
	
		return -1;
	}
	

	function searchForCommandIndex(result){
		var i=0;
		
		for (i=0; i<allCommandsArray.length; i++) 
		{ 
			if (allCommandsArray[i]==result.text) 
			{
				return i;
				
			} 
		}
	
		return -1;
		}
	
	function hideFlash()
	{
	
		//flashObjs = document.getElementsByTagName("div");
		flashObj=document.getElementById("flashContent");
		flashObj.style.visibility = "hidden";
		
	}
 
	function myStartRecognition()
	{
	
		document.getElementById(speechapi.containerID).startRecognition();
		//var t=setTimeout("myStopRecognition()",1500);
		setSwitchFocus(2);
 
		
	}
	
	function myStopRecognition()
	{
	
		document.getElementById(speechapi.containerID).stopRecognition();
		setSwitchFocus(1);
	//startRecogntion(); 
		
	}

 //alternate the focus of the switches when keys are pressed 
	function setSwitchFocus(switchnum)
	{
	 if ((switchnum ==1) || (switchnum ==2))
		 {
		 
		 	document.getElementById("switch"+switchnum).focus();
		 	if (switchnum==2)
	     	{
		 		switchnum=1;
	    	 }
		 	else switchnum=2;
	     
		 }
	} 
/*
	function overallVisibilityAdjustment()
	{

		document.switch1.style.visibility="hidden";
		
	} */