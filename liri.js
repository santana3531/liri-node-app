// Dependencies

// requires

// keys file
var keys = require("./keys.js");

// twitter
var Twitter = require("twitter");

// spotify
var Spotify = require("node-spotify-api");

// request
var request = require("request");

// fs package
var fs = require("fs");

var spotify = new Spotify({
	id: "0cf4cd8643bb412f934f60693f80e841",
	secret: "66b3f4d66a4947adbf61eb65768dd87a"
});


// --- functions ---
// twitter
var showTweets = function() {
	var client = new Twitter(keys.twitterKeys);

	var params = {
		screen_name: "artfarts10"
	}
};
client.get("statuses/user_timeline", params, function(error, tweets, response){
	if (!error){
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].created_at);
			console.log("");
			console.log(tweets[i].text);
		}
	}
});

// spotify
var showArtist = function(artist) {
  return artist.name;
};

// Spotify search
var showSpotify = function(songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }

  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;
    var data = [];

    for (var i = 0; i < songs.length; i++) {
      data.push({
        "artist(s)": songs[i].artists.map(showArtist),
        "song name: ": songs[i].name,
        "preview song: ": songs[i].preview_url,
        "album: ": songs[i].album.name
      });
    }

    console.log(data);
    writeToLog(data);
  });
};