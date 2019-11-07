//these are our npm dependencies
const twit = require('twit');
const animals = require('animals');
//these are depdedencies established in other files
const m = require('./data/meals.js');
const bf = m.breakfast;
//this is creating a twit object using API tokens established in a file that is ignored from git
const chefConfig = require('./chef.js');
const whChef = new twit(chefConfig);
const cron = require('node-cron');
const cronTime = require('cron-time-generator');
const cronJob = require('cron').CronJob;
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


// var stream = whChef.stream('statuses/filter', { track: '@realwhChef' });
//   stream.on('tweet', function(tweet){
//     tweetId = tweet.user.id_str;
//     person = tweet.user.screen_name;
//     whChef.post('statuses/update', {status: person + ' What gewd fam?! I appreciate the good vibes', in_reply_to_status_id: tweetId});
// });

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
var findFolks = new cronJob({
  cronTime: '0 22 * * *',
  onTick: function(){
    searchIt();
  },
  start: false,
  timeZone: 'America/Chicago'
});

findFolks.start();
breakFastJob.start();
