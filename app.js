const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const user = JSON.parse(
    fs.readFileSync(`${__dirname}/data.json`)
)

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let currentDay = days[d.getDay()];
console.log(currentDay)


const now = new Date();
const currentMinutes = now.getUTCMinutes();
const withinTwoMinutes = currentMinutes >= 58 || currentMinutes <= 2;

if (withinTwoMinutes) {
  console.log('Current UTC time is within the +/-2 minute window.');
} else {
  console.log('Current UTC time is outside the +/-2 minute window.');
}

const formattedTime = now.toISOString().slice(0, 19) + 'Z';

console.log('Current UTC time:', formattedTime);


app.get("/api", (req, res) => {
    res.status(200).json({
        slack_name : req.query.slack_name,
        current_day : currentDay,
        utc_time : formattedTime,
        track : req.query.track,
        github_file_url : user.github_file_url,
        github_repo_url : user.github_repo_url,
        status_code : user.status_code,
    })
})
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});
