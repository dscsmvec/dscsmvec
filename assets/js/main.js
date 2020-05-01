$('#learn_more').click(function(){
  window.open('https://developers.google.com/community/dsc');    
}); 
$('#visit_zilla').click(function(){
  window.open('https://smveczilla.in/courses.html');    
}); 
$('#visit_live').click(function(){
  //window.open('https://smveczilla.in/courses.html');    
});  
$('#openPrivacyModal').click(function(){
   $('#privacy_modal').modal('show');
});
$('#login_touch').click(() =>{
   window.location.replace("/join/core-login.html"); 
});
$('#form_touch').click(function(){
    window.location.replace("/join/career-form.html");
});

$('.cancel-btn').click(function(){
    $('#guest_modal').modal('hide');
});

window.onload = function() {
  console.log("%cStop!","color:red;font-size:35px;font-weight:700;");
  console.log("%cThis place is not for you, please close this window!", "color:blue; font-size: 15px;");

}


$('#report_option').click(function(){
  $('#report_me').modal('show'); 
});

