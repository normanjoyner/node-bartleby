// import dependencies
var fs = require("fs");
var exec = require('child_process').exec;
var _ = require("underscore");
var npm = require("npm");
var auth = require([__dirname, "..", "lib", "auth"].join("/")).auth;

exports.attach = function(server){

    // return the requested module from filesystem or get it from npm registry
    server.get("/repository", auth.basic, function(req, res){
        var module_info = req.query;

        if(module_info.version){
            var file = [process.env.HOME, ".npm", module_info.name, module_info.version, "package.tgz"].join("/");
            module.install(file, module_info, function(err, contents){
                if(!err){
                    res.writeHead(200);
                    res.write(contents, "binary");
                    res.end();
                }
                else
                    res.send(400);
            });
        }
        else{
            module.getLatestVersion(module_info.name, function(err, response){
                var version = _.first(_.keys(response));
                if(version){
                    module_info.version = version;
                    var file = [process.env.HOME, ".npm", module_info.name, module_info.version, "package.tgz"].join("/");
                    module.install(file, module_info, function(err, contents){
                        if(!err){
                            res.writeHead(200);
                            res.write(contents, "binary");
                            res.end();
                        }
                        else
                            res.send(400);
                    });
                }
                else
                    console.log("Error fetching the newest version of " + module_info.name);
            });
        }

    });
}

var module = {

    install: function(file, module_info, fn){
        fs.exists(file, function(exists){
            if(!exists){
                npm.load({}, function(){
                    npm.commands.cache(["add", [module_info.name, module_info.version].join("@")], function(){
                        module.fetch(module_info, function(err, contents){
                            fn(err, contents);
                        });
                    });
                });
            }
            else{
                module.fetch(module_info, function(err, contents){
                    fn(err, contents);
                });
            }
        });
    },

    fetch: function(module_info, fn){
        var file = [process.env.HOME, ".npm", module_info.name, module_info.version, "package.tgz"].join("/");
        fs.readFile(file, "binary", function(err, contents){
            fn(err, contents);
        });
    },

    getLatestVersion: function(module_name, fn){
        npm.load({}, function(){
            npm.commands.show([module_name, "version"], function(err, response){
                fn(err, response);
            });
        });
    }

}
