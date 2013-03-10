// import dependencies
var configuration = require([__dirname, "..", "config"].join("/"));
var _ = require("underscore");

var auth = {

    basic: function(req, res, next){
        var success = ["Basic", new Buffer(configuration.server.username + ":" + configuration.server.password).toString("base64")].join(" ") == req.header("Authorization");

        if(success)
            next();
        else
            res.send(401);
    }

}

exports.auth = auth;
