// import dependencies
var fs = require("fs");
var path = require("path");
var exec = require('child_process').exec;
var _ = require("underscore");
var npm = require("npm");
var auth = require([__dirname, "..", "lib", "auth"].join("/")).auth;

exports.attach = function(server){

    // return the requested module from filesystem or get it from npm registry
    server.get("/repository", auth.basic, function(req, res){
        var module_info = req.query;
        var file = [process.env.HOME, ".npm", module_info.name, module_info.version, "package.tgz"].join("/");

        path.exists(file, function(exists){
            if(!exists){
                module.install(module_info, function(err, contents){
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
                module.fetch(module_info, function(err, contents){
                    if(!err){
                        res.writeHead(200);
                        res.write(contents, "binary");
                        res.end();
                    }
                    else
                        res.send(400);
                });
            }
        });
    });
}

var module = {

    install: function(module_info, fn){
        npm.load({}, function(){
            npm.commands.cache(["add", [module_info.name, module_info.version].join("@")], function(){
                module.fetch(module_info, function(err, contents){
                    fn(err, contents);
                });
            });
        });
    },

    fetch: function(module_info, fn){
        var file = [process.env.HOME, ".npm", module_info.name, module_info.version, "package.tgz"].join("/");
        fs.readFile(file, "binary", function(err, contents){
            fn(err, contents);
        });
    }

}
