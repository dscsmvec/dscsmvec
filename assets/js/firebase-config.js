// Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyDue8AOIYVzv2ShPzuJYV5C9rvdJxiH_HQ",
    authDomain: "recuirtment-portal.firebaseapp.com",
    databaseURL: "https://recuirtment-portal.firebaseio.com",
    projectId: "recuirtment-portal",
    storageBucket: "recuirtment-portal.appspot.com",
    messagingSenderId: "110076146684",
    appId: "1:110076146684:web:8b10c5cd63a724ebf3b879"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 
  
    $('#core_apply').click(()=>{
        
       var coreEmail =  $('#core_email').val();
        var coreSection = $('select[name="section"]').val();
        
       var firstName = $('#core_firstname').val();
       var lastName  = $('#core_lastname').val();
       var coreName = firstName + ' ' + lastName;
        
       var coreRegisterNumber = $('#core_registernumber').val();
       var coreMobile = $('#core_mobile').val();
       var coreDepartment = $('select[name="department"]').val();
       var coreYear = $('input[name=year]:checked').val();
       var coreInterest = $('select[name="interest"]').val();
       
       var coreConfident = '';
       if($('#c').is(':checked')){
           coreConfident += $('#c').val()+',';
       }
       if($('#python').is(':checked')){
           coreConfident += $('#python').val()+',';
       }
        if($('#java').is(':checked')){
           coreConfident += $('#java').val()+',';
       }
        if($('#r').is(':checked')){
           coreConfident += $('#r').val()+',';
       }
        if($('#html').is(':checked')){
           coreConfident += $('#html').val()+',';
       }
        if($('#js').is(':checked')){
           coreConfident += $('#js').val()+',';
       }
        if($('#php').is(':checked')){
           coreConfident += $('#php').val()+',';
       }
        if($('#other').is(':checked')){
           coreConfident += $('#other_lang').val()+',';
       }
         if($('#illustrator').is(':checked')){
           coreConfident += $('#illustrator').val()+',';
       }
        if($('#photoshop').is(':checked')){
           coreConfident += $('#photoshop').val()+',';
       }
        if($('#ae').is(':checked')){
           coreConfident += $('#ae').val()+',';
       }
         if($('#video_editing').is(':checked')){
           coreConfident += $('#video_editing').val()+',';
       }
       
        
        
       var coreInstagram = $('#core_instagram').val();
       var coreLinkedIn = $('#core_linkedin').val();
       var coreFacebook = $('#core_facebook').val();
       var coreGithub = $('#core_github').val();
       var coreBehance = $('#core_behance').val();
       
       var coreNeed = $('#core_need').val();
        
        if(coreEmail != "" && firstName != "" && lastName != "" && coreRegisterNumber != "" && coreMobile != "" && coreDepartment != "Choose Department" && coreYear != null && coreInterest != "Choose Interested Field" && coreFacebook != "" && coreNeed != "" && coreSection != "Choose Section"){
            
            if(isEmail(coreEmail)){
                if($('#agree').isChecked()){
        
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                var userId = user.uid;
                var ref = firebase.database().ref("station");
                ref.child("entries").child(userId).set({
                    guestid: userId,
                    email: coreEmail,
                    name: coreName,
                    regnum: coreRegisterNumber,
                    mobile: coreMobile,
                    department: coreDepartment,
                    year: coreYear,
                    interest: coreInterest,
                    confident: coreConfident,
                    linkedin: coreLinkedIn,
                    instagram: coreInstagram,
                    facebook: coreFacebook,
                    github: coreGithub,
                    behance: coreBehance,
                    need: coreNeed,
                    status: 'pending',
                    section: coreSection
                }, function(err){
                    if(err){
                        alert('something went wrong! try again!');
                    }else{
                        $('#core_form').css('display','none');
                   $('#success_core_apply').css('display','block');$('#success_core_apply_img').css('display','block');
                    }
                });
            }else{
                window.location.replace("http://127.0.0.1:8000/career.html");
            }
        });
                }else{
                    alert('accept the terms');
                }
        }else{
            alert('invalid email');
        }
        }else{
            alert('required fields are empty!');
        }
               
    });

  function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

  $('#core_login_form').submit((e) => {
      e.preventDefault();
    var coreCode = $('#team_code').val();
    var corePass = $('#team_password').val();
      
      if(coreCode!=""&&corePass!=""){
          firebase.auth().signInWithEmailAndPassword(coreCode, corePass).then(function(){
              $('.login-clean').css('display','none');
      $('#core_logged_in').css('display','flex');
          })            .catch(function(error){
              
             if(error){
                 alert(error.message);
              }  
        });}else{
                  alert('empty fields');
              }
      
           
  });

  
$('#core_signout').click(()=>{
   firebase.auth().signOut().then(function(){
       $('.login-clean').css('display','block');
      $('#core_logged_in').css('display','none');       
   }).catch(function(error){
      alert(error);
   });
});

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {      
            $('.login-clean').css('display','none');
            $('#core_logged_in').css('display','flex');
            $('#core_userid').html(user.uid);
            $('#welcome_core').html('Welcome, '+user.email.split('@')[0]);
        }
          
              $('#entries_sub_block').html('');
      //     get entry data
          var rootRef = firebase.database().ref("station").child("entries");
          rootRef.on("value",function(snapshot){
              var html='';
              snapshot.forEach(function(childNodes){
                 html += '<div id="'+childNodes.val().guestid+'" class="card shadow-sm" id="entry_card" onclick="openDetails(this)"><div class="card-body text-center"><img class="p-3" height="100" width="100" src="../assets/img/iconfinder-icon%20(9).svg"/><h4 class="card-title" style="font-size: 15px;font-weight: bold;font-family: Lato, sans-serif;">'+childNodes.val().name+'</h4><h4 class="text-muted card-title" style="font-size: 15px;font-weight: bold;font-family: Lato, sans-serif;">'+childNodes.val().regnum+'</h4><p class="text-muted" style="font-size: 15px;">'+childNodes.val().interest+'</p><span class="badge badge-primary" id="depart_badge">'+childNodes.val().department+'</span><span class="badge badge-primary" id="year_badge">'+childNodes.val().year+'</span><span class="badge badge-danger pill" id="status_badge">'+childNodes.val().status+'</span></div></div>';
              });
              $('#entries_sub_block').append(html);
          });    
          
                       }); 
      
window.onload = function(){
    $('#entries_sub_block').html('');
      //     get entry data
          var rootRef = firebase.database().ref("station").child("entries");
          rootRef.on("value",function(snapshot){
              var html='';
              snapshot.forEach(function(childNodes){
                 html += '<div id="'+childNodes.val().guestid+'" class="card shadow-sm" id="entry_card" onclick="openDetails(this)"><div class="card-body text-center"><img class="p-3" height="100" width="100" src="../assets/img/iconfinder-icon%20(9).svg"/><h4 class="card-title" style="font-size: 15px;font-weight: bold;font-family: Lato, sans-serif;">'+childNodes.val().name+'</h4><h4 class="text-muted card-title" style="font-size: 15px;font-weight: bold;font-family: Lato, sans-serif;">'+childNodes.val().regnum+'</h4><p class="text-muted" style="font-size: 15px;">'+childNodes.val().interest+'</p><span class="badge badge-primary" id="depart_badge">'+childNodes.val().department+'</span><span class="badge badge-primary" id="year_badge">'+childNodes.val().year+'</span><span class="badge badge-danger pill" id="status_badge">'+childNodes.val().status+'</span></div></div>';
              });
              $('#entries_sub_block').append(html);
          });    
}


$('#entries_applied').click(()=>{
//    $('#entries_block').css('display','block');
//     $('#entries_sub_block').html('');
// //     get entry data
//     var rootRef = firebase.database().ref("station").child("entries");
//     rootRef.on("value",function(snapshot){
//         var html='';
//         snapshot.forEach(function(childNodes){
//            html += '<div id="'+childNodes.val().guestid+'" class="card shadow-sm" id="entry_card" onclick="openDetails(this)"><div class="card-body"><h4 class="card-title" style="font-size: 15px;font-weight: bold;font-family: Lato, sans-serif;">'+childNodes.val().name+'</h4><h4 class="text-muted card-title" style="font-size: 15px;font-weight: bold;font-family: Lato, sans-serif;">'+childNodes.val().regnum+'</h4><p class="text-muted" style="font-size: 15px;">'+childNodes.val().interest+'</p><span class="badge badge-primary" id="depart_badge">'+childNodes.val().department+'</span><span class="badge badge-primary" id="year_badge">'+childNodes.val().year+'</span><span class="badge badge-danger pill" id="status_badge">'+childNodes.val().status+'</span></div></div>';
//         });
//         $('#entries_sub_block').append(html);
//     });    
    
});
  
$('#accept_core').click(function(){    
    // console.log(this.id);
    var changeDb = firebase.database().ref('station').child('entries').child(this.id);
    changeDb.update({
       status: 'accepted'
    }).then(function(){
            $('#detail_core_info').modal('hide');            
          
    }).catch(function(e){
        alert(e.message);
    })    
});
$('#decline_core').click(function(){
    var changeDb = firebase.database().ref('station').child('entries').child(this.id);
    changeDb.update({
       status: 'rejected'
    }), function(err){
        if(err){
            alert(err.message);
        }else{
            $('#detail_core_info').modal('hide');            
        }
    }
});
function openDetails(e){
    $('#detail_core_info').modal('show');
    $('#decline_core').attr('id',e.id);
    $('#accept_core').attr('id',e.id);
    var df = firebase.database().ref("station").child("entries").child(e.id);
    df.on("value", function(snapshot){
        $('#core_detail_name').html(snapshot.val().name);   
        $('#core_detail_department').html(snapshot.val().department);   
        $('#core_detail_section').html(snapshot.val().section);  
        $('#core_detail_email').html(snapshot.val().email);  
        $('#core_detail_mobile').html(snapshot.val().mobile);  
         $('#core_detail_interest').html(snapshot.val().interest); 
         $('#core_detail_need').html(snapshot.val().need); 
         $('#core_detail_confident').html(snapshot.val().confident); 
         $('#core_detail_facebook').html(snapshot.val().facebook); 
         $('#core_detail_instagram').html(snapshot.val().instagram); 
         $('#core_detail_github').html(snapshot.val().github); 
         $('#core_detail_behance').html(snapshot.val().behance); 
         $('#core_detail_linkedin').html(snapshot.val().linkedin); 
        
         $('#core_detail_facebook').attr('href',snapshot.val().facebook); 
         $('#core_detail_instagram').attr('href',snapshot.val().instagram); 
         $('#core_detail_github').attr('href',snapshot.val().github); 
         $('#core_detail_behance').attr('href',snapshot.val().behance); 
         $('#core_detail_linkedin').attr('href',snapshot.val().linkedin); 
        $('#core_detail_regnum').html(snapshot.val().regnum); 
        
        if(snapshot.val().status === "accepted"){
            $('#core_detail_status').css("background","green");
        }
        if(snapshot.val().status === "rejected"){
            $('#core_detail_status').css('background-color','red');
        }
        if(snapshot.val().status === "pending"){
            $('#core_detail_status').css('background-color','yellow');
        }
        
        

         $('#core_detail_status').html(snapshot.val().status); 
         $('#core_detail_year').html(snapshot.val().year); 
        
        
       
        
        // $('#core_detail_department').html(snapshot.val().department);
    });   
}