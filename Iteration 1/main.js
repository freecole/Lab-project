// array to store questions
var myArray = new Array();
// questions for numerical and spoken link referencing
myArray[1] = "What is the average wing-span of bald eagles?";
myArray[2] = "How many rows of whiskers do cats have?";
myArray[3] = "How much better is the sence of smell of dogs than humans?"; 
myArray[4] = "How deep can dolphins swim?";
myArray[5] = "What is a person who makes horse shoes called?";
// questions for visual (pop up, highlight) and verbal feedback
myArray[6] = "How many giraffe species are there in total?";
myArray[7] = "What is the life expectancy of a shark?";

function date_time()
{
	//document.write("Last updated: ");
	
	// Date
	var today_date = new Date();
	var day = today_date.getDate();
	var month = today_date.getMonth()+1;
	var year = today_date.getFullYear();
	document.writeln(day + "/" + month + "/" + year);
	
    // Time
    var hour = today_date.getHours();
    var mins = today_date.getMinutes();
    var sec = today_date.getSeconds();
    document.writeln(hour + ":" + mins + ":" + sec);
}

//displays the questions
function question(i)
{
	document.writeln(myArray[i]);
}

function setup()
{
		//document.write('<font size="4" color="purple"><b><i>Speech api is setting up..</i></b></font>', this);
		alert("1) API has been setup");	
	
}

function loaded()
{
	alert("2) API has loaded the flash");
		//document.write('<font size="4" color="purple"><b><i>Speech api loaded.</i></b></font>', this);
}


function vocabSetup()
{	alert("3) Vocab has been setup successfully.");//Perhaps show vocab. 
		//document.write('<font size="4" color="purple"><b><i>Speech api loaded.</i></b></font>', this);

}

function resultReturned(stringresult)
{		alert("4) Result has been returned and is:"+stringresult);
		//document.write('<font size="4" color="purple"><b><i>Speech api loaded.</i></b></font>', this);

}