// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const uEmail = $('input#uEmail').val();
    console.log(uEmail)
    $.post('/storeEmail?' + $.param({email: uEmail}), function(){
      $('#feedback').remove()
      $('<p id="feedback" style="color:green"></p>').text('Submission successful').appendTo('main')
      $('input#uEmail').val('')
    })
  });
});
