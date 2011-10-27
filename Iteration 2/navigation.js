/*Author: Cole Noble */
    
    function scrolldown(){
    var x=400;
    self.scrollBy(0,x);
    }
    
    function scrollup(){
        var x=-400;
        self.scrollBy(0,x);
        }

  /* 
    function playautoscroll(){
    setInterval('scroll()',100);
   
    }
    */

 function goback()
 {
	 history.back(); 
 }
 
 function goforward()
 {
	 history.forward(); 
 }
  
 function gohome()
 {
	 window.open('http://localhost:8080/First_Iteration/quesOne.html','_self');
 }


