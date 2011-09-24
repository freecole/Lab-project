


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
        speechapi.setupPage("sal","password",onResult,onTtsComplete, onLoaded, "flashContent",linkables,speakables,focusables,browserControl,formsEnabled);


