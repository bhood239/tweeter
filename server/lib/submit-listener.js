$(".tweet-form").on("submit", (event) => {
  event.preventDefault();
  $.post( "/tweets", $(this).serialize() );
})