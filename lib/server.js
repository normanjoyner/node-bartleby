// import dependencies
var fs = require("fs");
var express = require("express");
var _ = require("underscore");
var configuration = require([__dirname, "..", "config"].join("/"));

exports.start = function(){

    // create server
    var server = express();

    // configure server
    server.configure(function(){
	    server.use(express.bodyParser());
    });

    // bootload RESTful paths
    var routesFiles= fs.readdirSync([__dirname, "..", "routes"].join("/"))

    _.each(routesFiles, function(file){
        if(/\.js$/.test(file))
            require([__dirname, "..", "routes", file].join("/")).attach(server);
    });

    server.listen(configuration.server.port);
    console.log(["Bartleby server listening on port", configuration.server.port].join(" "));
}
