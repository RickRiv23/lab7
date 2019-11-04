/* global $*/
/* global images*/

$("#orientation").on('change', function(){
   $("#selectOrientation").val($("#orientation").val()); 
   console.log(this.value);
});

$("#submitBtn").on('click', function(e){
    $("#selectOrientation").val($("#orientation").val());
   console.log($("#selectOrientation").val());
});
