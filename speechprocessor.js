//Note:First truncate this string

var allCommandsArray=[];
var neededNumbersArray=[];
var neededNameArray=[];
var neededCommandsAndNumbersString="";
var numericalReferenced=false;//Remember to change the library version accordingly!
var voiceFeedback=false;
var popUps=false;
var highlightLink=false;

var delayForVoicefeedback=3000;
//Decide whether or not to set up a numerical referencing system or a spoken link name referencing system

initialise();

	function setAsNumbered(choice)
	{
		if (choice==true)
			{
			 numericalReferenced=true;
			}
		else
			{
			numericalReferenced=false;
			}
		
	}
	
	function activateVoiceFeedback(choice)
	{
		if (choice==true)
		{
			voiceFeedback=true;
		}
	else
		{
			voiceFeedback=false;
		}
		
	}
	
	function activatePopupsFeedback(choice)
	{
		if (choice==true)
		{
			popUps=true;
		}
	else
		{
			popUps=false;
		}
	}
	
	function activateLinkHighlighting(choice)
	{
		if (choice==true)
		{
			highlightLink=true;
		}
	else
		{
			highlightLink=false;
		}
		
	}


    function onLoaded() 
    {	
    	if (voiceFeedback==true)
		{
    		speechapi.speak("Loaded","male"); 
		}
    
		
    	
    	//Now, on load for numerical referencing requires a vocab to be loaded
    	
    			
    			var allOptionsString=determineTotalVocabulary();//Retrieves an array with all the numbers and commands or all the link names
    			var neededSpeechSpace=determineSpecificVocab(allOptionsString);//Reduces the numbers array to only use number vocab that is needed
    			speechapi.setupRecognition("SIMPLE", neededSpeechSpace ,false);
    	
    
    		
        //Put something here that shows an image to indicate that the flash player is ready... 
	}
    
    function onResult(result) 
    {   
    	
    	if (popUps==true)
    	{
    	  	alert("We think you said: "+result.text);
    	
    	}
    			
    			document.getElementById('answer').innerHTML = result.text;
    			processResult(result);
    			
  
    }
     
	function onFinishTTS() { }
	
    
    //This function performs the basic setup for the numerically referenced pages
    function initialise()
    {
    	   
        var flashvars = {speechServer : "http://www.speechapi.com:8000/speechcloud"};
        var params = {allowscriptaccess : "always"};
        var attributes = {};
        attributes.id = "flashContent";
        swfobject.embedSWF("http://www.speechapi.com/static/lib/speechapi-1.6.swf", "myAlternativeContent", "215", "138", "9.0.28", false,flashvars, params, attributes);
        speechapi.setup("freecole","0706009y",onResult,onFinishTTS, onLoaded, "flashContent");
        
        setTimeout("initialisePage()",1000);
  
    }
    
    //Focuses on the buttons and hides the flash
    function initialisePage()
    {
    	 setSwitchFocus(1);
         hideFlash();
    	
    }

    function determineTotalVocabulary()
    {
    	 //if spoken link name is true, create this array by looping through all the links
		var allOptionsString="";
		//If this is not going to be numerically referenced, we need to create a vocabulary by extracting the link names and putting them in an alloptionsstring
		if (numericalReferenced==false)
			{
				allOptionsString=assignLinkWords();
			
			}
		else if (numericalReferenced==true) //otherwise, we assign a numerical vocabulary
			{
				allOptionsString="command down,command up,command back,command forward,command home,one,two,three,four,five,six,seven,eight,nine,ten";// list
			}
		return allOptionsString;
    	
    }
    
    function assignLinkWords() 
	{	
		var linkCount=document.links.length;
		var wordNumbers=[]; // An array to store number link assosiations
		var theLink="empty";
		var i=0;
		for (i=0; i<linkCount; i++) 
		{
			theLink = (document.links[i].name);
			wordNumbers[i]=theLink;
		}
	
		return wordNumbers.toString();
	}
    
    function determineSpecificVocab(allOptionsString)
    {
     var vocab="";	
    	if (numericalReferenced==false)
		{
    		vocab=determineSpecificLinkNamesString(allOptionsString);
		
		}
	else if (numericalReferenced==true) //otherwise, we assign a numerical vocabulary
		{
			vocab=determineSpecificNumericalString(allOptionsString);
		}
    
     return vocab;
    }
    //For now the function simply returns what it is given as allOptionsDoes not yet contain commands or additional names
    function determineSpecificLinkNamesString(allOptionsString)
    {
    	
    //	neededNumbersArray=allOptionsString;
    	neededNameArray=allOptionsString.split(',');//Turn into an array and store
    	return allOptionsString;
    	
    }
	function determineSpecificNumericalString(allOptionsString)
	{ 
																																					
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
			
			//Without the link numbers that are not needed
			return neededCommandsAndNumbersString;
			}
		
	}
   

// General purpose functions
	function processResult(result)
	{
		if (numericalReferenced==false)
			{
				tryProcessResultAsLinkName(result);	
			}
		else if (numericalReferenced==true)
			{
				if (!tryProcessResultAsCommand(result))
					{	
						tryProcessResultAsLink(result);
					}
			
			}
			
	}
	
	function tryProcessResultAsLinkName(result)
	{
		var index=searchForLinkNameIndex(result);
		if (index !=-1){ // if link exists, follow link
			var links=AssignLinkNumbers();// put links into index referable
											// form
			var myLink=links[index];// retrieve the link to be followed
			
			if (voiceFeedback==true)
			{
				speechapi.speak(result.text,"male"); 
			}
			
			document.getElementById('link').innerHTML=myLink;
	
			setTimeout(navigate, delayForVoicefeedback, myLink);//Note:This only works in firefox
	
		}
		
	}
	
	// Checks to see if a link number was called
	function tryProcessResultAsLink(result)
	{
		var index=searchForLinkNumberIndex(result);// find index used to follow
												// links
		// document.getElementById('index').innerHTML=index.text;
	
		if (index !=-1){ // if link exists, follow link
			var links=AssignLinkNumbers();// put links into index referable
											// form
			var myLink=links[index];// retrieve the link to be followed
			
			if (voiceFeedback==true)
			{
				speechapi.speak(result.text,"male"); 
			}
			document.getElementById('link').innerHTML=myLink;
			if (highlightLink==true) {changeLinkColour(result.text.toLowerCase());};//Change the link colour on selection if activated
		//	document.getElementById().color = "red";
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
	
	
//stores the URLS corresponding to the different link numbers
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
	function searchForLinkNumberIndex(result)
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
	
	function searchForLinkNameIndex(result)
	{
		var i=0;
		for (i=0; i<neededNameArray.length; i++) 
		{ var x=neededNameArray[i].toUpperCase();
		  var y=result.text.toUpperCase();
			if (x==y) 
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

	
	function changeLinkColour (i)
	{
		if(document.getElementById)
			document.getElementById(i).color = "red";
		else if(document.all)
			document.all[i].color = "red";
	}