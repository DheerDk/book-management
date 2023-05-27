$(document).ready(function(){
$.getJSON('/books/fetch_all_subjects',function(data){

     data.map((item)=>{
        $('#subjects').append($('<option>').text(item.subjectname).val(item.subjectid))

     })

    
$('#subjects').change(function(){

 $.getJSON('/books/fetch_all_title',{subjectid:$('#subjects').val()},function(data){

  $('#title').empty()
  $('#title').append($('<option>').text('-Select Title-'))
  data.map((item)=>{

    $('#title').append($('<option>').text(item.titlename).val(item.titleid))
  })


 })

})

})


})