const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const Tweet = require("../../models/Tweet");
const router = require("express").Router();
var sentimental = require("Sentimental");
var twit = require("twit");
var config = require("../../config");
require("dotenv").config();

const sentimentScore = (sentimentText) => {
  var resultss = {};
  var results = 0;
  var sentiments = "";
  var key = "tweetList";
  var tweet, retweet, favorite;
  resultss[key] = [];
  for (var i = 0; i < sentimentText.length; i++) {
    tweet = sentimentText[i]["text"]; //text of tweets
    tweet = tweet.replace("#", ""); //remove hashtag
    retweet = sentimentText[i]["retweet_count"];
    favorite = sentimentText[i]["favorite_count"];
    tweetDate = sentimentText[i]["created_at"];
    var score = sentimental.analyze(tweet)["score"];

    // Algorithm for get the sentiments
    results += score;
    if (score > 0) {
      if (retweet > 0) {
        results += Math.log(retweet) / Math.log(2);
      }
      if (favorite > 0) {
        results += Math.log(favorite) / Math.log(2);
      }
    } else if (score < 0) {
      if (retweet > 0) {
        results -= Math.log(retweet) / Math.log(2);
      }
      if (favorite > 0) {
        results -= Math.log(favorite) / Math.log(2);
      }
    } else {
      results += 0;
    }
    if (results > 0) {
      sentiments = "Positive";
    } else if (results == 0) {
      sentiments = "Neutral";
    } else {
      sentiments = "Negative";
    }

    var data = {
      text: tweet,
      score: results,
      retweet: retweet,
      favorite: favorite,
      tweetDate: tweetDate,
      sentiments: sentiments,
    };
    resultss[key].push(data);
    results = 0;
  }

  return resultss[key];
};


//@GET Routes
//@DESC Get all the Tweets of Logged in User
router.get("/tweets", auth, async (req, res) => {
  try {
    const tweets = await Tweet.find({ user: req.user.id });
    if (tweets.length == 0) {
      return res.json({ msg: "No Tweets Searched by the User" });
    }
    res.json(tweets);
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Tweet by ID
router.get("/tweet/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    var results = tweet.tweet;
    var positiveArr = results.filter((res) => {
      return res.sentiments == "Positive";
    });

    var negativeArr = results.filter((res) => {
      return res.sentiments == "Negative";
    });

    var neutralArr = results.filter((res) => {
      return res.sentiments == "Neutral";
    });
    res.json({
      tweet,
      noOfPositiveSentiments: positiveArr.length,
      noOfNeutralSentiments: neutralArr.length,
      noOfNegativeSentiments: negativeArr.length,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/sentiments", auth, async (req, res) => {
  var twitter = new twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
  });

  var query = `${req.body.sentiments} since:${req.body.date}`;
  twitter.get(
    "search/tweets",
    {
      q: `${req.body.sentiments} since:${req.body.date}`,
      count: req.body.noOfTweets,
    },
    async (err, data, response) => {
      var results = sentimentScore(data.statuses);
      var tweetFields = {
        tweet: [],
      };
      tweetFields.user = req.user.id;
      tweetFields.tweet = results;

      var positiveArr = results.filter((res) => {
        return res.sentiments == "Positive";
      });

      var negativeArr = results.filter((res) => {
        return res.sentiments == "Negative";
      });

      var neutralArr = results.filter((res) => {
        return res.sentiments == "Neutral";
      });

      tweetFields.searchedDate = req.body.date;
      tweetFields.keyWords = req.body.sentiments;
      var tweet = new Tweet(tweetFields);
      await tweet.save();
      return res.json({
        results,
        noOfPositiveSentiments: positiveArr.length,
        noOfNeutralSentiments: neutralArr.length,
        noOfNegativeSentiments: negativeArr.length,
      });
    }
  );
});

router.get("/allAnalysis", auth, async (req, res) => {
  try {
    const tweets = await Tweet.find({ user: req.user.id });
    if (tweets.length == 0) {
      return res.json({ msg: "No Analysis created!" });
    }

    res.json(tweets);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/tweet/delete/:id", auth, async (req, res) => {
  try {
    await Tweet.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;


// ,
//     "server": "nodemon app",
//     "client": "npm start --prefix frontend",
//     "dev": "concurrently \"npm run server\" \"npm run client\""