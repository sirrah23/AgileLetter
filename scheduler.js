const CronJob = require("cron").CronJob;


module.exports = {
 runWeekly(day, hour, minute, f){
   console.log("scheduling")
    if(day < 0 || day > 6){
      throw `${day} is not a valid day of the week`
    }
    if(hour < 0 || hour > 23){
      throw `${hour} is not a valid hour`
    }
    if(minute < 0 || minute > 59){
      throw `${minute} is not a valid minute`
    }
    const weeklyCron = `${minute} ${hour} * * ${day}`
    const job = new CronJob(weeklyCron, f, null, true, 'America/New_York')
    job.start()
   console.log("scheduled")
 }
}