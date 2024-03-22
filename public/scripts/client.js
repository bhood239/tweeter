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
          <p>${tweetObject.content.text}</p>
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

    return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);
    }
  }


  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: renderTweets,
      error: function(xhr, status, error) {
        console.error('Error loading tweets:', error);
      }
    });
  }
  
  // Call the loadTweets function to fetch the tweets
  loadTweets();
});

