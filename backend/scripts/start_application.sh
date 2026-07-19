#!/bin/bash

export NVM_DIR="/home/ec2-user/.nvm"

source "$NVM_DIR/nvm.sh"

cd /home/ec2-user/backend

pkill -f "node src/app.ts" || true

nohup node src/app.ts \
  > /home/ec2-user/backend/app.log 2>&1 &