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
Bartleby client is configured to read from the config file located in .bartleby folder located in the users home directory.
Simply create a json configuration file similar to the following:

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

###Usage
Install:
```bash
bartleby install bartleby-client                # installs the most up-to-date version of a package
bartleby install bartleby-client@0.0.1          # installs a specific version of a package
bartleby install bartleby-client@0.0.x          # installs a wildcard version of a package
bartleby install                                # installs dependencies specified in package.json
```

Bump:
```bash
bartleby bump                                   # bumps the package.json patch version
bartleby bump patch                             # bumps the package.json patch version
bartleby bump minor                             # bumps the package.json minor version
bartleby bump major                             # bumps the package.json major version
```
