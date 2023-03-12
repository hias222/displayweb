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

cd $BASE_DIR

# build
npm run build

cd build
tar -cvzf $TEMP_DIR/${APP_NAME}.tar.gz *
scp $TEMP_DIR/${APP_NAME}.tar.gz ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME}:${REMOTE_TMP}
rm $TEMP_DIR/${APP_NAME}.tar.gz

ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo ls ${REMOTE_TMP}/${APP_NAME}.tar.gz
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm -rf ${NGINX_DIR}/${APP_NAME}
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo mkdir ${NGINX_DIR}/${APP_NAME}
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo tar -xvzf ${REMOTE_TMP}/${APP_NAME}.tar.gz -C ${NGINX_DIR}/${APP_NAME}
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm ${REMOTE_TMP}/${APP_NAME}.tar.gz
