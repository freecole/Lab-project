
$(document).ready(function(){
$("button#switch1").keydown(function(){myStartRecognition();});//Note, keydown activates recognition. Stops after some time.
$("button#switch2").keydown(function(){myStopRecognition();});
});


