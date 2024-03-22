$(".tweet-form").on("submit", function(event) {
  event.preventDefault();
  $.post("/tweets", $(this).serialize());
});