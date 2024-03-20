/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function(tweetObject) {
    const formattedDate = new Date(tweetObject.created_at);
    const dateString = formattedDate.toLocaleDateString();

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
            <div>${dateString}</div>
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
      $('.tweets-container').append($tweet);
    }
  }

  renderTweets(data);
  
});