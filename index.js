var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var fs = require('fs');
var _ = require('underscore');
var app = express();
// dataUtil.restoreOriginalData();
var _DATA = dataUtil.loadData().jobInfo;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

// submit job post via HTML form
app.get('/addJob', function(req, res) {
    res.render('form');
});

// make job post using POST endpoint route
app.post('/api/addJob', function(req, res) {
    let body = req.body;
    if (!body) {
        res.send('HTML Body is missing...');
    } else {
        // transformation of qualifications
        body.qualifications = body.qualifications.split(";");
        // saves new post
        _DATA.push(req.body);
        dataUtil.saveData(_DATA);
        res.send("Internship info successfully posted.");
    }
});

// display every job post in HTML page
app.get('/', function(req, res) {
    res.render('getJobs', {
        data: _DATA
    });
});

// return all job posts in JSON
app.get('/api/getJobs', function(req, res) {
    let jobData = _DATA;
    if (!jobData) return res.json({});
    res.json(jobData);
});

// return all job posts by specified company in JSON
app.get('/api/getJobs/company/:company', function(req, res) {
    let _company = req.params.company.toLowerCase();
    if (!_company) return res.json({});

    let jobArray = [];
    _.each(_DATA, function(element) {
        if (element.companyName.toLowerCase() === _company) {
            jobArray.push(element);
        }
    });
    if (!jobArray) return res.json({});
    res.json(jobArray);
});

// return all job posts by specified location (city or state) in JSON
app.get('/api/getJobs/location/:location', function(req, res) {
    let _location = req.params.location.toLowerCase();
    if (!_location) return res.json({});

    let jobArray = [];
    _.each(_DATA, function(element) {
        let array = element.location.split(", ");
        if (array[0].toLowerCase() === _location || array[1].toLowerCase() === _location) {
            jobArray.push(element);
        }
    });
    if (!jobArray) return res.json({});
    res.json(jobArray);
});

// return all job posts by specified keyword in qualifications list in JSON
app.get('/api/getJobs/qualifications/:keyword', function(req, res) {
    let _keyword = req.params.keyword.toLowerCase();
    if (!_keyword) return res.json({});

    let jobArray = [], done = false, index = 0;
    _.each(_DATA, function(element) {
        while (!done && index < element.qualifications.length) {
            if (element.qualifications[index].toLowerCase().includes(_keyword)) {
                jobArray.push(element);
                done = true;
            } else {
                index++;
            }
        }
    });
    if (!jobArray) return res.json({});
    res.json(jobArray);
});

// display only internships
app.get('/internships', function(req, res) {
    let internship_data = [];
    _.each(_DATA, function(element) {
        if (element.jobType.toLowerCase().includes("intern")) {
            internship_data.push(element);
        }
    });
    res.render('nav', {
        data: internship_data
    });
});

// display only full-time jobs
app.get('/fullTime', function(req, res) {
    let fullTime_data = [];
    _.each(_DATA, function(element) {
        if (element.jobType.toLowerCase().includes("intern")) {
            // do nothing
        } else {
            fullTime_data.push(element);
        }
    });
    res.render('nav', {
        data: fullTime_data
    });
});

// display highest paying full-time jobs
app.get('/topPayingFullTime', function(req, res) {
    let fullTime_data = [];
    _.each(_DATA, function(element) {
        if (element.jobType.toLowerCase().includes("intern")) {
            // do nothing
        } else {
            fullTime_data.push(element);
        }
    });
    fullTime_data.sort(function(a, b) { return b.salary-a.salary });
    if (fullTime_data.length > 5) {
        fullTime_data = fullTime_data.slice(0, 5);
    }
    res.render('nav', {
        data: fullTime_data
    });
});

// display only technical jobs
app.get('/technical', function(req, res) {
    let technical_data = [];
    _.each(_DATA, function(element) {
        if (element.isTechnical.toLowerCase().includes("y")) {
            technical_data.push(element);
        }
    });
    res.render('nav', {
        data: technical_data
    });
});

// display only non-technical jobs
app.get('/nonTechnical', function(req, res) {
    let nonTechnical_data = [];
    _.each(_DATA, function(element) {
        if (element.isTechnical.toLowerCase().includes("n")) {
            nonTechnical_data.push(element);
        }
    });
    res.render('nav', {
        data: nonTechnical_data
    });
});

app.listen(3000, function() {
    console.log('Listening!');
});
