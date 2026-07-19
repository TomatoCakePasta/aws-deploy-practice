#!/bin/bash

export NVM_DIR="/home/ec2-user/.nvm"

source "$NVM_DIR/nvm.sh"

nvm use 22

cd /home/ec2-user/backend

npm install