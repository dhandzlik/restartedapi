var express = require('express');
var app = express();
require('dotenv').config();

var cos = require('cors');
app.use(cos({optionsSuccessStatus:200 }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/api", (req, res) => {
    res.sendFile(__dirname + "/views/api.html");
})

app.get("/api/:word/echo", (req, res) => {
    if(req.params.word == process.env.OOPSIES_WORD) {
        res.sendFile(__dirname + "/views/what.html")
    } else {
        res.json({
            echo: req.params.word
        })
    }
})

app.get("/api/getTime", (req, res) => {
    var date = new Date().getDate();
    res.json({
        time: date.getDay + " " + date.getMonth + " " + date.getFullYear + " - " + date.getHours + ":" + date.getMinutes + ":" + date.getSeconds + ":" + date.getMilliseconds
    })
})

app.get("/api/secret", (req, res) => {
    res.sendFile(__dirname + "/views/videos/hdygh.html");
})

app.get("/api/secret/:videoid/:password", (req, res) => {
    if(req.params.password == "hello") {
        var a = /^\d+$/.test(req.params.videoid);
        if(a) {
            res.sendFile(__dirname + "/views/videos/" + req.params.videoid.toString() + ".html");
        } else {
            res.sendFile(__dirname + "/views/videos/nuhuh.html");
        }
    } else {
        res.sendFile(__dirname + "/views/failed.html");
    }
})
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});