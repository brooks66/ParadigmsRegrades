// Initialization of things
Label.prototype = new Item();
Button.prototype = new Item();
Div.prototype = new Item();
Img.prototype = new Item();
var movie_id = null;
var movie_result = null;
var rating_result = null;
var movie_title = null;
var movie_image = null;
var movie_rating = null;

// Create main div
mainDiv = new Div();
mainDiv.createDiv("mainDiv");

// Create upvote div, button
upvoteDiv = new Div();
upvoteDiv.createDiv("upvoteDiv");
upvotebutton = new Button();
upvotebutton.createButton("UP", "theUpvoteButton");
upvoteDiv.addItemToTheDiv(upvotebutton);
upvotebutton.addClickEventHandler(placeUpvote);
mainDiv.addItemToTheDiv(upvoteDiv);

// Get first recommendation, info
getInfo();

// Create movie div, add appropriate things
movieDiv = new Div();
movieDiv.createDiv("movieDiv");
var titleLabel = new Label();
titleLabel.createLabel(movie_title, "titleLabel");
var movieImage = new Img();
movieImage.createImg("http://www.cse.nd.edu/~cmc/teaching/cse30332/images" + movie_image, "movieImage");
//movieImage.createImg("https://s-media-cache-ak0.pinimg.com/originals/a6/18/64/a6186459266bfaa86be41f49cb4ffd80--taylor-swift-new-single-singers.jpg", "movieImage");
var movieRating = new Label();
movieRating.createLabel(movie_rating, "ratingLabel");
movieDiv.addItemToTheDiv(titleLabel);
movieDiv.addItemToTheDiv(movieImage);
movieDiv.addItemToTheDiv(movieRating);
mainDiv.addItemToTheDiv(movieDiv);

// Create downvote div, button
downvoteDiv = new Div();
downvoteDiv.createDiv("downvoteDiv");
downvotebutton = new Button();
downvotebutton.createButton("DOWN", "theDownvoteButton");
downvoteDiv.addItemToTheDiv(downvotebutton);
downvotebutton.addClickEventHandler(placeDownvote)
mainDiv.addItemToTheDiv(downvoteDiv);

// Add the main div to document
mainDiv.addToDocument();

function getInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://localhost:40013/reset/", false)
  xhr.onload = function(e) {
    xhr.responseText;
  	getRecommendation();
	};
  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  };
  xhr.send(null)
}

function getRecommendation() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:40013/recommendations/1", false)
  xhr.onload = function(e) {
    movie_id = JSON.parse(xhr.responseText);
  	getMovie();
	};
  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  };
  xhr.send(null)
}

function getMovie() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:40013/movies/" + movie_id["movie_id"], false)
  xhr.onload = function(e) {
    movie_result = JSON.parse(xhr.responseText);
		movie_title = movie_result["title"];
//		titleLabel.setText(movie_title);
		movie_image = movie_result["img"];
		getRating();
  };
  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  };
  xhr.send(null)
}

function getRating() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:40013/ratings/" + movie_id["movie_id"], false)
  xhr.onload = function(e) {
    rating_result = JSON.parse(xhr.responseText);
 		movie_rating = rating_result["rating"];
//		movie_rating.setText(movie_rating);
	 };
  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  };
  xhr.send(null)
}

function placeUpvote() {
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://localhost:40013/recommendations/1", false)	
	xhr.onload = function(e) {
		xhr.responseText;
		getRecommendation();
	};
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	};
	blah = {};
	blah["movie_id"] = movie_id["movie_id"];
	blah["rating"] = 5;
	xhr.send(JSON.stringify(blah))
	titleLabel.setText(movie_title);
	movieRating.setText(movie_rating);
	movieImage.changeImg("http://www.cse.nd.edu/~cmc/teaching/cse30332/images" + movie_image);
}

function placeDownvote() {
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://localhost:40013/recommendations/1", false)	
	xhr.onload = function(e) {
		xhr.responseText;
		getRecommendation();
	};
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	};
	blah = {};
	blah["movie_id"] = movie_id["movie_id"];
	blah["rating"] = 1;
	xhr.send(JSON.stringify(blah))
	titleLabel.setText(movie_title);
	movieRating.setText(movie_rating);
	movieImage.changeImg("http://www.cse.nd.edu/~cmc/teaching/cse30332/images" + movie_image);
}
