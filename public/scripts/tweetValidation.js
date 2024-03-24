function validateTweet() {
  const tweetText = document.querySelector('.tweet-text').value;
  
  // Check if the tweet is empty or null
  if (!tweetText || tweetText.trim() === '') {
      alert('Tweet cannot be empty!');
      return false;
  }

  // Check if the tweet exceeds 140 characters
  if (tweetText.length > 140) {
      alert('Tweet cannot exceed 140 characters!');
      return false;
  }

  return true;
}