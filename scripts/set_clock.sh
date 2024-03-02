#!/bin/bash

BASE_DIR=/Users/matthiasfuchs/Projects/schwimmen/displayweb
TEMP_DIR=/tmp
REMOTE_TMP=/tmp
NGINX_DIR=/usr/share/nginx/html
APP_NAME=display
# need ssh certs
#REMOTE_SERVER_NAME=jetson.fritz.box
#REMOTE_SERVER_USER=jetson

REMOTE_SERVER_NAME=rockpi-4b.fritz.box
REMOTE_SERVER_USER=rock

#REMOTE_SERVER_NAME=swim.fritz.box
#REMOTE_SERVER_USER=pi

# linux set time
ACTUAL_TIME=$(date)
echo Time $ACTUAL_TIME
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo date --set=\"$ACTUAL_TIME\"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo timedatectl
