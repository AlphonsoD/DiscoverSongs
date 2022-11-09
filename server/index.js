var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var axios = require('axios');

const PORT = process.env.PORT || 5000;
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const SCOPE = 'playlist-modify-private playlist-modify-public user-read-private'

var CLIENT_ID = 'ec3bc680649746bf80990f24b968692f'; // Your client id
var CLIENT_SECRET = 'b3e3f1baed3d47209d25462d94c6e9fe'; // Your secret
var REDIRECT_URI = 'http://localhost:5000/callback'; // Your redirect uri

var app = express();
app.use(cors())
    .use(cookieParser());

var stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/login', function(req, res) {
    // Strongly recommended by Spotify docs to protect against attacks like cross-site forgery
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    res.redirect(AUTHORIZE +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPE,
            redirect_uri: REDIRECT_URI,
            state: state
        }));
});

app.get('/callback', function(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const refresh_token = body.refresh_token;
            const expires_in = body.expires_in;
            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in
            })

            console.log(body);

            res.redirect(`http://localhost:3000/main/?${queryParams}`);
        }
        else {
            console.log(error);
            console.log("there was an error");
            res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
    });
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query.refresh_token;

    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
    }
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
              'access_token': access_token
            });
        }
    });

})

console.log("Listening on port " + PORT);
app.listen(PORT);