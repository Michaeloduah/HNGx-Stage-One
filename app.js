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
const utcHours = String(now.getUTCHours()).padStart(2, '0');
const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');

const formattedTime = `${utcHours}:${utcMinutes}:${utcSeconds}`;

console.log('Current UTC time (24-hour format):', formattedTime);





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
