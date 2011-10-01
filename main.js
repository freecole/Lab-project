// array to store questions
var myArray = new Array();
var index=0;
myArray[1] = "What is the average wing-span of bald eagles?";
myArray[2] = "How many rows of whiskers do cats have?";
myArray[3] = "How much better is the sence of smell of dogs than humans?"; 
myArray[4] = "How deep can dolphins swim?";
myArray[5] = "What is a person who makes horse shoes called?";
myArray[6] = "How many giraffe species are there in total?";
myArray[7] = "What is the life expectancy of a shark?";
myArray[8] = "How much can sloths rotate their heads?";

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

function setup(option)
{
	if (option == true)
	{
		document.write('<font size="4" color="purple"><b><i>Speech api is setting up..</i></b></font>');
		
	}
	else
	{
		document.write('<font size="4" color="purple"><b><i>Speech api is not set up!!</i></b></font>');
	}
	
}

function loaded(option)
{
	if (option == true)
	{
		document.write('<font size="4" color="purple"><b><i>Speech api loaded.</i></b></font>');
	}
	else
	{
		document.write('<font size="4" color="purple"><b><i>Speech api has not loaded!!</i></b></font>');
	}
}