// Main .js file from which data is extracted
	
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

