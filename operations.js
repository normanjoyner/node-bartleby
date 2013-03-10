// import dependencies
var fs = require("fs");
var exec = require("child_process").exec;
var http = require("http");
var _ = require("underscore");
var request = require("request");
var npm = require("npm");
var pkg = require([process.cwd(), "package"].join("/"));
var configuration = require([process.env.HOME, ".bartleby", "config"].join("/"));

var operations = {

    install: function(modules){
        if(modules.length == 0){
            modules = _.map(_.pairs(pkg.dependencies), function(module){
                return module.join("@");
            });
        }

        _.each(modules, function(module){
            dependencies.download(module);
        });
    },

    publish: function(){
        // stub for now
    },

    clean: function(){
        exec("rm -rf node_modules", function(err){
            if(err)
                throw new Error("Could not clean node_modules directory");
        });
    }

}

var dependencies = {

    download: function(module){
        var module = module.split("@");
        var base_url = [configuration.server.host, configuration.server.port].join(":");

        var options = {
            qs: {
                name: module[0]
            },
            url: ["http:/", base_url, "repository"].join("/"),
            method: "GET",
            auth: {
                username: configuration.server.username,
                password: configuration.server.password
            }
        }

        if(module[1])
            options.qs.version = module[1];

        var filename = [options.qs.name, "tgz"].join(".");

        request(options, function(err, response){
            if(err && err.code == "ECONNREFUSED")
                console.log("Cannot connect to the Bartleby server!");
            else{
                dependencies.install(filename, function(err){
                    if(err)
                        console.log("Error installing " + options.qs.name);
                    else
                        console.log("Installed " + options.qs.name);
                });
            }
        }).pipe(fs.createWriteStream([process.env.HOME, ".bartleby", "tmp", filename].join("/")));

    },

    install: function(filename, fn){
        npm.load({}, function(){
            npm.commands.install([[process.env.HOME, ".bartleby", "tmp", filename].join("/")], function(installErr){
                fs.unlink([process.env.HOME, ".bartleby", "tmp", filename].join("/"), function(unlinkErr){
                    fn(installErr || unlinkErr);
                });
            });
        }); 
    }

}

exports.operations = operations;
