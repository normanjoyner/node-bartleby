#!/usr/bin/env node

// import dependencies
var fs = require("fs");
var args = process.argv.slice(2);
var operations = require([__dirname, "operations"].join("/")).operations;

fs.exists([process.cwd(), "node_modules"].join("/"), function(exists){
    if(!exists)
        fs.mkdirSync([process.cwd(), "node_modules"].join("/"));
});

fs.exists([process.env.HOME, ".bartleby"].join("/"), function(exists){
    if(!exists)
        fs.mkdirSync([process.env.HOME, ".bartleby"].join("/"));
});

fs.exists([process.env.HOME, ".bartleby", "tmp"].join("/"), function(exists){
    if(!exists)
        fs.mkdirSync([process.env.HOME, ".bartleby", "tmp"].join("/"));
});

var operation = args[0];
var params = args.slice(1);

if(operation == "install")
    operations.install(params);
else if(operation == "bump")
    operations.bump(params);
else if(operation == "clean")
    operations.clean();
else
    throw new Error("Please use either 'bartleby clean' or 'bartleby install'");
