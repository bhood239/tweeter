$(document).ready(function() {
  $( ".tweet-text" ).on( "input", function( event ) {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const remaining = maxLength - currentLength;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $(".counter").css('color', '#ff0000');
    } else {
      $(".counter").css('color', '');
    }
  })
})