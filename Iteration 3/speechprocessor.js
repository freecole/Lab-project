/*
Note: The API used in this application is GNU GPL. The API was accessed from www.speechAPI.com
The method "getElementsByClassName" was adapted from: http://javascript.about.com/library/bldom08.htm
Other Content was authered by Cole Noble
*/


var allCommandsArray=[];
var neededNumbersArray=[];
var neededNameArray=[];
var neededConfirmationsArray=[];

var neededCommandsAndNumbersString="";
//Will enable visual display of how far the PI process gets
var debugmode=false;

//The following highlight different operating modes and feedback modes
var numericalReferenced=false;//Remember to change the library version accordingly!
var voiceFeedback=true;
var popUps=false;
var highlightLink=true;
var highlightColour="Red";//Sets the colour of link highlighting 
var confirmationMode=false;//By default, no commad mode on
var delayForVoicefeedback=1000;
//Decide whether or not to set up a numerical referencing system or a spoken link name referencing system

var linkAwaitingConfirmation="empty";
var lastResult="none";//Used for the confirmation. Need to know last result so that colour reversion can occure
var confirmationDecline=false;//Determines whether or not to tell if loaded

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
  //This function performs the basic setup for the numerically referenced pages
    function initialise()
    {	
    	   
        var flashvars = {speechServer : "http://www.speechapi.com:8000/speechcloud"};
        var params = {allowscriptaccess : "always"};
        var attributes = {};
        attributes.id = "flashContent";
        swfobject.embedSWF("http://www.speechapi.com/static/lib/speechapi-1.6.swf", "myAlternativeContent", "215", "138", "9.0.28", false,flashvars, params, attributes);
        speechapi.setup("freecole","0706009y",onResult,onFinishTTS, onLoaded, "flashContent");
        
		if (debugmode==true) {setup();}//This shows an image indicating that the API has been setup
        setTimeout("initialisePage()",1000);
  
    }

    function onLoaded() 
    {	if (debugmode==true) {loaded();}//Shows that the API has been loaded successfully
   
 	if ((voiceFeedback==true) &&  (confirmationDecline==false)) //Make sure that a decline has not just happened. No need to tell of loaded
		{
    		speechapi.speak("Ready","male"); 
		}
	
		
    	
    	//Now, on load for numerical referencing requires a vocab to be loaded
    	
    			
    			var allOptionsString=determineTotalVocabulary();//Retrieves an array with all the numbers and commands or all the link names
    			var neededSpeechSpace=determineSpecificVocab(allOptionsString);//Reduces the numbers array to only use number vocab that is needed
			//	alert(neededSpeechSpace);
    			speechapi.setupRecognition("SIMPLE", neededSpeechSpace ,false);
				
				if (debugmode==true) {vocabSetup();}
				
    
    		
        //Put something here that shows an image to indicate that the flash player is ready... 
	}
    
    function onResult(result) 
    {   if (debugmode==true) {resultReturned(result.text);}
    	
    	if (popUps==true)
    	{
    	  	alert("We think you said: "+result.text);
    	
    	}
    			
    			document.getElementById('answer').innerHTML = result.text;
    			processResult(result);
    			
  
    }
     
	function onFinishTTS() { }
	
    
   
    
    //Focuses on the buttons and hides the flash
    function initialisePage()
    {
    	setSwitchFocus();//focuses on an page element so keypress works
        hideFlash();
    	
    }

    function determineTotalVocabulary()
    {
    	 //if spoken link name is true, create this array by looping through all the links
		var allOptionsString="";

		if (confirmationMode==true) //perform this check first as you dont want to change the state of numerical and spoken link referecning every time a confirmation mode changes
			{
				allOptionsString="yes,no";
			}
		else if (numericalReferenced==false)
			{
				allCommandsString="down,up,backwards,forward,home,";
				var wordsInLinks=assignLinkWords();
				allOptionsString=allCommandsString+wordsInLinks;
			}
		else if (numericalReferenced==true) //otherwise, we assign a numerical vocabulary
			{
				allOptionsString="down,up,backwards,forward,home,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eightteen,nineteen,twenty";// list
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
			theLink = (document.links[i].id);
			wordNumbers[i]=theLink;
		}
	
		return wordNumbers.toString();
	}
    
    function determineSpecificVocab(allOptionsString)
    {
     var vocab="";	
		if (confirmationMode==true)
		{ //although it returns the same thing, it also loades the neededConfirmationsArray
			vocab=determineSpecificConfirmationsString(allOptionsString);
		}
    else if (numericalReferenced==false)
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
    	firstElementIndex=allOptionsString.indexOf("home")+5;//Home must always be the last! Offeset fives first element
		if (firstElementIndex !=-1)
			{
			// Extract all the required commands
			var allCommandsString= allOptionsString.slice(0,firstElementIndex-1);
			allCommandsArray=allCommandsString.split(",");
			
			//Extract the words again
			var allLinkWordsString= allOptionsString.slice(firstElementIndex);
			neededNameArray=allLinkWordsString.split(",");
		
    	
			return allOptionsString;//Return everything you were given as this is needed for the entire vocab
			}
			else return "ERROR!";
    }
	//For consistency, a sperate function was created for this. What if additinal commands are needed in the furure. 
	 function determineSpecificConfirmationsString(allOptionsString)
    {
    	

    	neededConfirmationsArray=allOptionsString.split(',');//Turn into an array and store
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
			
			changeLinkNameToReflectNumber(neededNumbersArray);//This will put the link numbers in the actual link names on the HTML page
			
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
	
	function changeLinkNameToReflectNumber(neededNumbersArray)
	{ //only update the numbering if this is the first time a page is being called 
		if (lastResult=="none") 
		{var i=0;
			for (i=0;i<neededNumbersArray.length;i++)
			{
			 var toWrite=i+1;
			 document.links[i].innerHTML="["+toWrite+"] "+document.links[i].innerHTML;
			}
		}
	}
   

// General purpose functions
	function processResult(result)
	{	
		if (result.text.toUpperCase()=="RECOGNITION ERROR")
			{
				speechapi.speak("Please say again","male");
			}
		else if (confirmationMode==true)
			{
				tryProcessConfirmation(result);
			}
			
		else if (numericalReferenced==false)
			{
				if (!tryProcessResultAsCommand(result))
				{
					tryProcessResultAsLinkName(result);
				}
			}
		else if (numericalReferenced==true)
			{
				if (!tryProcessResultAsCommand(result))
					{	
						tryProcessResultAsNumberedLink(result);
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
			
			//document.getElementById('link').innerHTML=myLink;
			if (highlightLink==true) {
			changeLinkIDs();//Assign each font element the appropriate id
			changeLinkColour(result.text.toLowerCase(),highlightColour);};//Change the link colour on selection if activated
			
			changeToConfirmationMode(myLink,result.text);
			
			
			//setTimeout(navigate, delayForVoicefeedback, myLink);//Note:This only works in firefox
	
		}
		
	}
	
	// Checks to see if a link number was called
	function tryProcessResultAsNumberedLink(result)
	{
		var index=searchForLinkNumberIndex(result);// find index used to follow
												// links
		// document.getElementById('index').innerHTML=index.text;
	
		if (index !=-1){ // if link exists, follow link
			var links=AssignLinkNumbers();// put links into index referable
											// form
			var myLink=links[index];// retrieve the link to be followed
			
			
			
			//alert(links.toString());
			if (voiceFeedback==true)
			{
				speechapi.speak(result.text,"male"); 
			}
			//document.getElementById('link').innerHTML=myLink;
			if (highlightLink==true) {
			changeLinkIDs();//Assign each font element the appropriate id
			changeLinkColour(result.text.toLowerCase(),highlightColour);};//Change the link colour on selection if activated
	
			changeToConfirmationMode(myLink,result.text);
			//setTimeout(navigate, delayForVoicefeedback, myLink);//Note:This only works in firefox
	
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
		case 2:	speechapi.speak("Backwards","male");
				//setTimeout(goback, delayForVoicefeedback);
				changeToConfirmationMode("empty link",result.text);
				break;
		case 3:	speechapi.speak("Forward","male");
				//setTimeout(goforward, delayForVoicefeedback);
				changeToConfirmationMode("empty link",result.text);
				break;
		case 4:	speechapi.speak("Home","male");
				//setTimeout("gohome()",delayForVoicefeedback);
				changeToConfirmationMode("empty link",result.text);
				break;
		default:return false; 
		}
		return true;

		
	}
	
	function tryProcessConfirmation(result)
		{
			var answer=result.text.toUpperCase();
			
			if (answer=="NO")
				{speechapi.speak("No","male"); 
				confirmationMode=false;
				confirmationDecline=true;//Makes sure "loaded is not said when no navigation occures"
				onLoaded();//Set up the original vocabulary again
				
				
				 changeLinkColour (lastResult,"blue");//Create conditional check (may be a command and not a link number...)
			
				}
			else if (answer=="YES")
				{	speechapi.speak("Yes","male"); 
					confirmationMode=false;//Set back to the other mode 
					var command=checkResultIsCommand(lastResult);
					if (command==true)
					{
						processConfirmationTypeCommand(lastResult);
					
					}		
					else setTimeout(navigate,delayForVoicefeedback,linkAwaitingConfirmation); 
					//navigate(linkAwaitingConfirmation);//result is not a command but a link. Thus, navigate
				}
		
		
		}
		
	function checkResultIsCommand(theLastResult)
	{
		if  ((theLastResult.toUpperCase()=="HOME") || (theLastResult.toUpperCase()=="BACKWARDS") || (theLastResult.toUpperCase()=="FORWARD"))
			{
				return true;
			}
		else
		return false;
	}
	
	function processConfirmationTypeCommand(lastResult)
	{
		if (lastResult.toUpperCase()=="HOME") 
		{setTimeout("gohome()",delayForVoicefeedback);}
		else if (lastResult.toUpperCase()=="BACKWARDS")
		{setTimeout("goback()", delayForVoicefeedback);}
		else if
		(lastResult.toUpperCase()=="FORWARD")
		{setTimeout("goforward()", delayForVoicefeedback);}
		else alert("processConfirmationTypeCommand does not consider the issued command to be a confirmation type command.");
	
	
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
	
	function changeToConfirmationMode(myLink,name)
	{
	 confirmationMode=true;//This will divert flow of program from the onLoaded point onward
	 lastResult=name; //set the global variable for use in confirmation mode (need to access the previous result)
	 linkAwaitingConfirmation=myLink;//Assign to global
	 //highlight the link
	 confirmationDecline=true;
	 onLoaded();//Force it 
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
		
 
		
	}
	
	function myStopRecognition()
	{
	
		document.getElementById(speechapi.containerID).stopRecognition();
		
	//startRecogntion(); 
		
	}

 //alternate the focus of the switches when keys are pressed 
	function setSwitchFocus()
	{	//If there are links, focus on the first one.
		if (document.links.length>1)
		{
			document.links[0].focus();
		}
	
	} 
	
	function navigate(mylink)
	{
		changeLinkColour (lastResult,"blue");
		document.location.href =mylink;// follow it
	}

	
	function changeLinkColour (i,colour)
	{
		if(document.getElementById)
			document.getElementById(i).color = colour;
		else if(document.all)
			document.all[i].color = colour;
	}
	//Adapted from http://javascript.about.com/library/bldom08.htm
	//Creates a function that allows us to search for elements by a certain class
	document.getElementsByClassName = function(cl) 
	{
		var retNode = [];
		var myClass = new RegExp('\\b'+cl+'\\b');
		var element = this.getElementsByTagName('*');
		for (var i = 0; i < element.length; i++) {
			var classes = element[i].className;
		if (myClass.test(classes)) retNode.push(element[i]);
	}
		return retNode;
	}; 
	//This function cycles through all the font elements that contrinute to link highlight and assigns them the appropriate reference
	function changeLinkIDs()
	{
	var canHighlight=document.getElementsByClassName('tobered');
	 var i=0;
	 if (numericalReferenced==true)
	{//Assign numbers
		for (i=0;i<canHighlight.length;i++)
		{  //element.attributeName = 'value'
			document.getElementsByClassName('tobered')[i].id=neededNumbersArray[i];
		}
	}
	else 
	{//Assign numbers
		for (i=0;i<canHighlight.length;i++)
		{  //element.attributeName = 'value'
			document.getElementsByClassName('tobered')[i].id=neededNameArray[i].toLowerCase();;
		}
	}

	
	}