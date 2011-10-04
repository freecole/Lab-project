function date_time()
{
	document.write("Last updated: ");	
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
