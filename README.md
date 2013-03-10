node-bartleby-client
====================

##About

###Description
Node.js module to connect to [node-bartleby server] (https://github.com/normanjoyner/node-bartleby/tree/server)

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```
git clone git@github.com:normanjoyner/node-bartleby.git
cd node-bartleby
git checkout client
chmod +x application.js
sudo ln -s application.js /usr/bin/bartleby
```
###Configuration
Create a json configuration file for the client similar to the following:

**~/.bartleby/config.json**
```json

{
    "server":{
        "port": 8467,
        "host": "localhost",
        "username": "admin",
        "password": "admin-password"
    }
}
```

Bartleby client is configured to read from the config file located in .bartleby folder located in the users home directory
