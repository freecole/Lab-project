//Note:First truncate this string

var allCommandsArray=[];
var neededNumbersArray=[];
var neededCommandsAndNumbersString="";
var numericalReferenced=true;//Remember to change the library version accordingly!
var delayForVoicefeedback=1000;
//Decide whether or not to set up a numerical referencing system or a spoken link name referencing system

initialise(numericalReferenced);

function initialise(bnumericalReferenced)
{
if (bnumericalReferenced===true)
	{
		initialiseNumericalReference();
	}
else
	{
		initialiseNameReference();
	}
}

    function onLoaded() 
    {	
    	speechapi.speak("Loaded","male"); 
    	//Now, on load for numerical referencing requires a vocab to be loaded
    	if (numericalReferenced===true)
    		{  
    			var neededSpeechSpace=determineArrays();
    			speechapi.setupRecognition("SIMPLE", neededSpeechSpace ,false);
    		}
    
    		
        //Put something here that shows an image to indicate that the flash player is ready... 
	}
    
    function onResult(result) 
    { 
    	if (numericalReferenced===true)
    		{
    			document.getElementById('answer').innerHTML = result.text;
    			processResult(result);
    			
    			
    		}
    	
    }
     
	function onFinishTTS() { }
	
    
    //This function performs the basic setup for the numerically referenced pages
    function initialiseNumericalReference()
    {
    	   
        var flashvars = {speechServer : "http://www.speechapi.com:8000/speechcloud"};
        var params = {allowscriptaccess : "always"};
        var attributes = {};
        attributes.id = "flashContent";
        swfobject.embedSWF("http://www.speechapi.com/static/lib/speechapi-1.6.swf", "myAlternativeContent", "215", "138", "9.0.28", false,flashvars, params, attributes);
        speechapi.setup("freecole","0706009y",onResult,onFinishTTS, onLoaded, "flashContent");
        
        setTimeout("initialisePage()",1000);
  
    }
    //This function is in contrast to the initialiseNumericalReference function as it sets up the engine to rather reference links by name
    function initialiseNameReference()
    {
        var linkables = ["a"];
        var speakables = [];
        var focusables =[];
        var browserControl = false;
        var formsEnabled = false;

        function onTtsComplete() {}
        function onResult(result) {}
        function onLoaded() {}

        var flashvars = {speechServer : "http://www.speechapi.com:8000/speechcloud"};
        //var flashvars = {speechServer : "rtmp://www.speechapi.com:1935/firstapp"};
        var params = {allowscriptaccess : "always"};
        var attributes = {};
        attributes.id = "flashContent";
        swfobject.embedSWF("http://www.speechapi.com/static/lib/speechapi-1.7.swf", "myAlternativeContent", "215", "138", "9.0.28", false,flashvars, params, attributes);
        speechapi.setupPage("freecole","0706009y",onResult,onTtsComplete, onLoaded, "flashContent",linkables,speakables,focusables,browserControl,formsEnabled);
    	
        setTimeout("initialisePage()",1000);
       
       
    }
    
    //Focuses on the buttons and hides the flash
    function initialisePage()
    {
    	 setSwitchFocus(1);
        // hideFlash();
    	
    }
    
	function determineArrays()
	{ 
		var allOptionsString="command down,command up,command back,command forward,command home,one,two,three,four,five,six,seven,eight,nine,ten";// list
																																					
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
			speechapi.speak(result.text,"male");
			document.getElementById('link').innerHTML=myLink;
			setTimeout(navigate, delayForVoicefeedback, myLink);//Note:This only works in firefox
	
		}
	}
	
	// checks to see if a command was called
	function tryProcessResultAsCommand(result)
	{
		 var index=searchForCommandIndex(result);
		switch(index){
		case 0:	speechapi.speak("Down","male");
				setTimeout("scrolldown()", delayForVoicefeedback);
				break;
		case 1:	speechapi.speak("Up","male");
				setTimeout(scrollup, delayForVoicefeedback);
				break;
		case 2:	speechapi.speak("Back","male");
				setTimeout(goback, delayForVoicefeedback);
				break;
		case 3:	speechapi.speak("Forward","male");
				setTimeout(goforward, delayForVoicefeedback);
				break;
		case 4:	speechapi.speak("Home","male");
				setTimeout("gohome()",delayForVoicefeedback);
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
	
	function navigate(mylink)
	{
		document.location.href =mylink;// follow it
	}
/*	
	function determinSpeechAPIVerion()
	{
		if ( numericalReferenced==true)
			{
				return "http://www.speechapi.com/static/lib/speechapi-1.3.js"
			
			}
		else
			{
			return "http://www.speechapi.com/static/lib/speechapi-1.5.js"
			}
		
	}
	*/
/*
	function overallVisibilityAdjustment()
	{

		document.switch1.style.visibility="hidden";
		
	} */