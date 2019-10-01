//these are our npm dependencies
const twit = require('twit');
const animals = require('animals');
const cronJob = require('cron').CronJob;
//these are depdedencies established in other files
const m = require('./data/meals.js');
const bf = m.breakfast;
//this is creating a twit object using API tokens established in a file that is ignored from git
const chefConfig = require('./chef.js');
const whChef = new twit(chefConfig);
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
        if( myid_str.indexOf(tweet.user.id_str) >= 0){
          let statusObj = {
            status: 'yes master',
            in_reply_to_status_id: tweet.id_str
          }
          whChef.post('statuses/update', statusObj);
        }
        else {
          let statusObj = {status: "sup @" + tweet.user.screen_name + "? did you really just tweet at a bot? That's so adorable!!! This is an automated response. I will likely never read your tweet/mention. Weeelp. No news is good news right?? I'm assuming you're singing my praises. Have a great day fam!",
          in_reply_to_status_id: tweet.id_str
          }
          whChef.post('statuses/update', statusObj);
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


//this makes sure that the breakfast function runs everymorning at 8:00am EST
var breakFastJob = new cronJob({
  cronTime: '45 5 * * *',
  onTick: function(){
    breakFast();
  },
  start: false,
  timeZone: 'America/Chicago'
});
//this looks for followers every sunday, wednesday and friday at 715 PM CST
breakFastJob.start();


