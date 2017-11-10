const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const url = require('url');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;
const router = express.Router();

function goGetUrl(req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const urlGo = query.go;

    if (!urlGo) {
        return res.json({error: 'Need a GO path'});
    }
    const urlToParse = url.parse(urlGo, true);

    return {
        url: urlToParse.protocol + "//" + urlToParse.host + '/api/v1' + urlToParse.pathname + "/jobs",
        group: urlToParse.query.groups
    };
}

function renderResponse(res, body, group) {
    let b = JSON.parse(body);
    if (group) {
        b = b.filter(function (ob) {
            return ob.groups.indexOf(group) > -1;
        });
    }

    return res.json(b);
}

router.get('/url', function (req, res) {
    const urlToUse = goGetUrl(req, res);

    return request(urlToUse, function (error, response, body) {
        if (!error) {
            renderResponse(res, body, urlToUse.group);
        } else {
            res.json({error: error.toString()})
        }
    });
});

router.get('/tracker', function (req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const apiKey = query.apiKey;
    const projectId = query.projectId;

    if (!apiKey || !projectId) {
        return res.json({error: 'Need a apiKey and projectId'});
    }

    return request({
        headers: {
            'X-TrackerToken': apiKey,
        },
        uri: "https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/iterations?scope=current",
        method: 'GET'
    }, function (error, response, body) {
        const jsonBody = JSON.parse(body);
        if (error || jsonBody.error) {
            return res.json({error: jsonBody.error})
        }

        request({
            headers: {
                'X-TrackerToken': apiKey,
            },
            uri: "https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/iterations/" + jsonBody[0].number + "/analytics",
            method: 'GET'
        }, function (error, response, body) {
            const result = JSON.parse(body);
            result['start'] = jsonBody[0].start;
            result['finish'] = jsonBody[0].finish;
            res.json(result)
        })
    });
});

app.use('/', router);
app.listen(port);