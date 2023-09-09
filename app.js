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

const currentUtcTime = new Date().toISOString();
console.log(currentUtcTime);
console.log(`2023-08-21T15:04:05Z`)

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

console.log(formattedTime);

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
