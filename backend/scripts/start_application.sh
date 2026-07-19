#!/bin/bash

cd /home/ec2-user/backend

pkill -f "node src/app.ts" || true

# continue process after disconnecting ssh
# store Node.js log to as app.log file
nohup node src/app.ts \
  > /home/ec2-user/backend/app.log 2>&1 &