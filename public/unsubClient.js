$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const uEmail = $('input#uEmail').val();
    console.log(uEmail)
    $.post('/deleteEmail?' + $.param({email: uEmail}), function(){
      $('#feedback').remove()
      $('<p id="feedback" style="color:green"></p>').text('Submission successful').appendTo('main')
      $('input#uEmail').val('')
    })
  });
});
