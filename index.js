//these are our npm dependencies
const twit = require('twit');
const animals = require('animals');
//these are depdedencies established in other files
const m = require('./data/meals.js');
const bf = m.breakfast;
//this is creating a twit object using API tokens established in a file that is ignored from git
const chefConfig = require('./chef.js');
const whChef = new twit(chefConfig);
const loudSoundConfig = require('./henry.js');
const loudSound = new twit(loudSoundConfig);
const cron = require('node-cron');
const cronTime = require('cron-time-generator');
const myid_str = [925160703006330880, 22831053, 1096867112029691911,];

//this function creates a random breakfast purportedly served to the president of the united states and tweets it
function breakFast(){ 
  var test = animals();
  var breakfast = bf[Math.floor(Math.random()*bf.length)];
  const params = {
    status: 'today for breakfast @realdonaldtrump is having ' + test + '-dick ' + breakfast 
  }
  whChef.post('statuses/update', params);
}


var stream = whChef.stream('statuses/filter', { track: '@realwhChef' });
  stream.on('tweet', function(tweet){
        tweetId = tweet.user.id_str;
        if(myid_str.includes(tweetId) ){
          let statusObj = {
            status: 'yes master',
            in_reply_to_status_id: tweet.id_str
          }
          console.log('one of my bois just tweeted'+ tweet.user.id_str);
          // whChef.post('statuses/update', statusObj);
        }
        else {
          let statusObj = {status: "sup @" + tweet.user.screen_name + "? did you really just tweet at a bot? That's so adorable!!! This is an automated response. I will likely never read your tweet/mention. Weeelp. No news is good news right?? I'm assuming you're singing my praises. Have a great day fam!",
          in_reply_to_status_id: tweet.id_str
          }
          // whChef.post('statuses/update', statusObj);
          console.log('ohhh shit stranger danger!' + tweet.user.id_str);
        }
});

function searchIt() {
whChef.get('search/tweets', {q: "\" Trump Dick\"",}  , gotData);
  function gotData(err,data) {
    let message = "  ay yo. Alls I heard was talk bout' trump and dicks. I thought you might wanna follow my page! I feed that man dicks everyday";
    if(!data){
      console.log(err);
    }
    if(data){
      let tweets = data.statuses;
      for(var i = 0; i < tweets.length; i++){
        var statusObj = {
                          status: "@" + tweets[i].user.screen_name + message,
                          in_reply_to_status_id: tweets[i].id_str
                        }
  
        whChef.post('statuses/update', statusObj);
      }
    }
  }
}

cron.schedule(cronTime.everyDayAt(6), function () {
  breakFast();
});

//this looks for followers every sing day at 1010
cron.schedule(cronTime.everyDayAt(10, 10), function() {
  searchIt();
});


