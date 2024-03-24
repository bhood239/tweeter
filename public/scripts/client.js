/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
 

  const createTweetElement = function(tweetObject) {
    const formattedDate = timeago.format(tweetObject.created_at);

    const $tweet = $(`
        <header class="current-tweets-top">
          <div class="top-left">
            <img class="current-profile-pic" src="${tweetObject.user.avatars}"> 
            <div>${tweetObject.user.name}</div>
          </div>
          <div class="top-right">${tweetObject.user.handle}</div>
        </header>
        <footer>
          <p></p>
          <div class="bottom">
            <div>${formattedDate}</div>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-repeat"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        </footer>
    `);

    $tweet.find("p").text(tweetObject.content.text);
    return $tweet;
  };

  // Function to render tweets
  const renderTweets = function(tweets) {
    $('.tweets-container').empty(); // Clear existing tweets
    for (const tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $('.tweets-container').prepend($tweet); // Append new tweet
    }
};

// Function to load tweets via AJAX
const loadTweets = function() {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'json',
        success: renderTweets,
        error: function(xhr, status, error) {
            console.error('Error loading tweets:', error);
        }
    });
};


//Function to validate tweets
function validateTweet() {
  const tweetText = document.querySelector('.tweet-text').value;
  
  // Check if the tweet is empty or null
  if (!tweetText || tweetText.trim() === '') {
      $('.new-tweet').append($('<p class="error-message">Write something!</p>'));
      return false;
  }

  // Check if the tweet exceeds 140 characters
  if (tweetText.length > 140) {
      $('.new-tweet').append($('<p class="error-message">Thats too much! Only 140 characters plz</p>'));
      return false;
  }

  return true;
}

// Form submission event handler
$(".tweet-form").submit(function(event) {
    event.preventDefault();

     // Validate tweet
     if (!validateTweet()) {
      return false; // Prevent form submission if validation fails
     }
    const formData = $(this).serialize(); // Serialize form data

    // Send AJAX POST request to submit the form data
    $.post("/tweets", formData)
        .done(function(response) {
            loadTweets(); // Load tweets after successful submission
        })
        .fail(function(xhr, status, error) {
            console.error('Error submitting tweet:', error);
        });
});

// Load tweets once page is ready
loadTweets();

});

