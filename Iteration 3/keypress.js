/*Author:Cole Noble */
var downActive=false;

document.onkeydown=keyDown;
function keyDown(e)
{
 if (downActive==false) //do not allow reactivation until the key has gone up
	{
	code=determineCode(e);
	if (code==17) {
	downActive=true;
	myStartRecognition();
	}
	//start recognition
	}

 
}


document.onkeyup=keyUp;
function keyUp(e)
{
	code=determineCode(e);
	
	if (code==17) 
	 { 
	  downActive=false;//since it is up, it is no longer down...
	  myStopRecognition();
	 }
  
 
}
 
function determineCode(e)
{
if (!e) e=window.event;
	var code;
	if ((e.charCode) && (e.keyCode==0))
    {
	code = e.charCode;
	}
	else
    {
	code = e.keyCode;  
	}
	return code;
}
