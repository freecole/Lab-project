var myArray = new Array();
var index=0;
myArray[1] = "What is the average wing-span of bald eagles?";
myArray[2] = "How much better is the sence of smell of dogs than humans?";
myArray[3] = "What is the average lifespan of a horse?";

function date_time()
{
	document.write("Last updated: ");
	// Date
	var today_date = new Date();
	var day = today_date.getDate();
	var month = today_date.getMonth()+1;
	var year = today_date.getFullYear();
	document.writeln(day + "/" + month + "/" + year);
    //document.write(" ");
	
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

//checks if the correct category is selected
function checkAnswer(quizForm,theAnswer)
{
	var value;	
	var i=0;
	var answer1 = 1;
	var answer2 = 3;
	var answer3 = 5;
	
	for(;i<quizForm.elements.length;i++)
	{
		if ("cc" == quizForm.elements[i].name)
		{
			value = quizForm.elements[i].value;
			//alert(value);
		}
	}

	if (value == theAnswer)
	{
		alert("Correct answer: " + value);
		if (value == answer1)
		{
			//alert("birds");
			document.URL = "http://localhost:8080/First_Iteration/Birds.html";
		}
		else if (value == answer2)
		{
			document.URL = "http://localhost:8080/First_Iteration/Dogs.html";
		}
		else if (value == answer3)
		{
			document.URL = "http://localhost:8080/First_Iteration/Horses.html";
		}
	}
	else
	{
		alert("Wrong answer: " + value);
	}
	return false;
}

//Checks if the fact numbers are correct
function check(quizForm,theAnswer)
{
	var value;	
	var i=0;
	var answer1 = 4;
	var answer2 = 1;
	var answer3 = 3;
	
	
	for(;i<quizForm.elements.length;i++)
	{
		if ("aa" == quizForm.elements[i].name)
		{
			value = quizForm.elements[i].value;
			//alert(value);
		}
	}

	if (value == theAnswer)
	{
		alert("Correct answer: " + value);
		if (value == answer1)
		{
			//alert("ques 2");
			document.URL = "http://localhost:8080/First_Iteration/questionTwo.html";
		}
		else
		{
			alert("Test completed");
		}
		/*else if (value == answer2)
		{
			document.URL = "http://localhost:8080/browser_testing/quesThree.html";
		}
		else if (value == answer3)
		{
			alert("Test completed");
			document.URL = "http://localhost:8080/browser_testing/finalPage.html";
			//window.open();
		}*/
	}
	else
	{
		alert("Wrong answer: " + value);
	}
	return false;
}

